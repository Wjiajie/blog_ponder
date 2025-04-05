---
title: '使用llmware创建第一个知识库'
slug: llmware-create-first-library
authors: [jiajiewu]
tags: [rag]
keywords: ["RAG", "LLM", "个人博客", "技术实现"]
description: "本文介绍了如何使用llmware库创建第一个知识库，包括文档解析、分块、索引和基本查询的步骤。"
draft: false
---
import ZoomImage from '@site/src/components/ZoomImage';

**系列文章**
* [我的RAG学习路线图](/blog/my-rag-learning-road-map)
* [如何使用LLMware开始学习RAG](/blog/how-to-start-learn-rag-with-llmware)

这个小结我们会先从一个简单的例子：*example-1-create_first_library.py* 开始llmware系列的学习，这个示例会调用llmware的库函数完成以下的几个基础步骤：

1. 创建一个库作为您的知识库的组织结构。
2. 下载示例文件以获得快速入门-这些文件容易替换为我们私人的文件。
3. 使用add_files方法自动解析、文本块和索引文档。
4. 对您的新库运行基本文本查询。

我会在下文中详细介绍这个构建知识库并执行基本文本查询的过程，一些模块的细节。

<!-- truncate -->

完整的代码如下：

```python

""" 
这段代码主要涉及对文档的处理和配置。首先介绍了一些示例文档集，包括联合国决议、发票、合同、财务报告等不同类型的文档。可以设置活动数据库，默认是 “mongo”，从版本 0.4.0 起默认改为 “sqlite”。还能设置不同的调试模式视图，如查看每个解析文件的进度等。接着定义了一个包含多个文档文件夹名称的列表，以及一个库名称和从列表中选取的一个示例文件夹名称，最后调用函数对文档进行解析并放入指定库中。
"""

import os
from llmware.library import Library
from llmware.retrieval import Query
from llmware.setup import Setup
from llmware.configs import LLMWareConfig

def parsing_documents_into_library(library_name, sample_folder):
	print(f"\nExample - Parsing Files into Library")
	# 创建新库
	print (f"\nStep 1 - creating library {library_name}")
	library = Library().create_new_library(library_name) d
	#加载llmware示例文件
	#--注意：如果您以前使用过此示例，UN-Restions-500是新路径
	#--拉取更新的示例文件，设置：'over_write=True'
	sample_files_path = Setup().load_sample_files(over_write=True)
	
	print (f"Step 2 - loading the llmware sample files and saving at: {sample_files_path}")
	#注意：要替换为您自己的文档，只需指向包含文档的本地文件夹路径
	ingestion_folder_path = os.path.join(sample_files_path, sample_folder)

	print (f"Step 3 - parsing and indexing files from {ingestion_folder_path}")
	#add_files是关键的摄取方法-解析、文本块和索引文件夹中的所有文件
	#--会根据文件扩展名自动路由到正确的解析器
	#--支持的文件扩展名：. pdf、.pptx、.docx、.xlsx、.csv、.md、.txt、.json、.wav和.zip、.jpg、.png
	parsing_output = library.add_files(ingestion_folder_path)
	
	print (f"Step 4 - completed parsing - {parsing_output}")
	# 获取更新后的 library card
	updated_library_card = library.get_library_card()
	doc_count = updated_library_card["documents"]
	block_count = updated_library_card["blocks"]
	
	print(f"Step 5 - updated library card - documents - {doc_count} - blocks - {block_count} - {updated_library_card}")
	#检查为库创建的主文件夹结构-检查 /images找到提取的图像
	library_path = library.library_main_path
	
	print(f"Step 6 - library artifacts - including extracted images - saved at folder path - {library_path}")

	# 使用.add_files建立您的库，和/或为不同的知识库创建不同的库
	#现在，您的库已准备就绪，您可以开始使用该库运行查询
	#如果您使用的是目前的“协议”库，那么一个很简单的“hello world”查询是“基本工资”
	#如果您使用的是其他示例文件夹之一（或您自己的文件夹），那么您应该调整查询
	#查询总是以相同的方式创建，例如，实例化一个Query对象，并传递一个库对象
	#--在Query类中，有多种有用的方法来运行不同类型的查询
	
	test_query = "base salary"
	print(f"\nStep 7 - running a test query - {test_query}\n")
	query_results = Query(library).text_query(test_query, result_count=10)
	for i, result in enumerate(query_results):

	#注意：每个结果都是一个字典，其中包含广泛的有用键
	#--我们鼓励您花一些时间来查看每个键和可用的元数据类型
	#这里有一些有用的属性
	
	text = result["text"]
	file_source = result["file_source"]
	page_number = result["page_num"]
	doc_id = result["doc_ID"]
	block_id = result["block_ID"]
	matches = result["matches"]
	#--如果打印到控制台太冗长，那么只选择几个键进行打印
	print("query results: ", i, result)
	return parsing_output


if __name__ == "__main__":

#注意示例文档-由Setup（）下载
#UN-Restions-500是500个pdf文件
#发票是40个pdf发票样本
#协议是~15份合同文件
#协议大约为80份合同文件
#FinDocs是约15份财务年度报告和收益
#SmallLibrary混合了约10个pdf和office文档

#可选-设置要使用的活动数据库-默认情况下，它是"mongo"
#如果您刚刚入门，并且还没有安装单独的数据库，请选择“sqlite”
#update：从llmware v0.4.0（2025年3月）开始，默认db设置为sqlite

LLMWareConfig().set_active_db("sqlite")

#如果您想查看不同的日志视图，例如，查看每个解析文件的列表'进行中'，
#您可以随时设置不同的调试模式视图
#debug_mode选项-
#0-默认-显示状态管理器（在大型解析作业中很有用）并显示错误
#2-仅文件名-显示正在解析的文件名，仅显示错误
#为了这个例子的目的，让我们改变一下，这样我们就可以看到一个文件一个文件的进度
LLMWareConfig().set_config("debug_mode", 2)

#这是将通过调用Setup（）下拉的文档文件夹列表
sample_folders = ["Agreements", "Invoices", "UN-Resolutions-500", "SmallLibrary", "FinDocs", "AgreementsLarge"]
library_name = "example1_library"

#选择其中一个示例文件夹
selected_folder = sample_folders[0] # e.g., "Agreements"

#运行示例
output = parsing_documents_into_library(library_name, selected_folder)

```

## LLMWareConfig
LLMWareConfig 是 llmware 库中的核心配置类，它负责管理整个框架的全局配置。它主要负责以下几个方面的配置管理：
1. 文件路径管理：定义和管理 llmware 框架使用的各种文件路径。
	1. 基础路径：home_path 是用户的主目录，llmware_path_name 是 llmware 数据的主目录名。
	2. 定义了各种子目录的名称，如模型仓库、知识库、输入通道等。
2. 数据库配置：管理不同类型数据库的连接和配置
	列出了 llmware 支持的各种数据库类型：
	- vector_db：向量数据库，用于存储嵌入向量（默认sqlite）。
	- collection_db：集合数据库，用于存储文档和块（默认milvus）。
	- table_db：表格数据库，用于存储结构化数据（默认sqlite）。
3. 日志配置：控制日志级别和格式
	管理日志配置，包括设置和获取日志级别和格式。
4. 工作空间设置：创建和管理 llmware 的工作目录结构
	通过setup_llmware_workspace来创建 llmware 的工作目录结构，包括创建各种目录并设置适当的权限。
对初学者，默认的配置其实已经满足使用条件了，有定制化需求的话，再通过LLMWareConfig中的库函数来设置上面的四部分的属性值。

在demo代码中，在完成基础的配置以后，主要的知识库创建，解析文件，分块，存储，检索等过程都在parsing_documents_into_library中完成，让我们继续探索这个函数的实现细节：

## 创建知识库（Library）
Library 类是 llmware 的核心组织结构，它提供了一个统一的接口来管理非结构化信息的集合。
<ZoomImage src="https://cdn.sa.net/2025/03/16/9afgx5tyknNjV47.png" alt="screenshot-20250316-131507.png" />
### 核心特点：
- 组织结构：Library 作为一个索引集合，包含从解析文件中提取的文本、表格和图像。
- 元数据管理：每个 Library 都有一个 library_card，记录了文档数量、块数量、图像数量等元数据。
- 文件系统结构：Library 在文件系统中创建一系列目录来存储各种资源：
	- library_main_path：主目录
	- file_copy_path：原始文件的副本
	- image_path：提取的图像
	- dataset_path：数据集
	- 等等

**创建知识库的过程**：
```python
library = Library().create_new_library(library_name)
```
*create_new_library*用于创建新的库或者加载已存在的同名库。函数首先对传入的库名进行安全检查，如果库已存在则加载现有库，不存在则创建新库并初始化一系列路径和目录，同时创建一个新的库条目并注册新的库卡片，最后根据需要创建表并构建文本索引。

```python
def create_new_library(self, library_name, account_name="llmware"):

"""Explicit constructor to create a new library with selected name.
If a library with the same name already exists, it will load the existing library.

Checks if library_name is safe. If not, it will change library_name to a safe name.

Parameters

----------

library_name : str
name of the library to create
account_name : str, default="llmware"
name of the account associated with the library
Returns

-------

library : Library
A new ``Library`` object representing the newly created or loaded existing library

"""


# note: default behavior - if library with same name already exists, then it loads existing library
self.library_name = library_name
self.account_name = account_name
# apply safety check to library_name path
library_name = Utilities().secure_filename(library_name)
library_exists = self.check_if_library_exists(library_name,account_name)
if library_exists:
	# do not create
	logger.info(f"update: library already exists - returning library - {library_name} - {account_name}")
	return self.load_library(library_name, account_name)
# assign self.library_name to the 'safe' library_name
self.library_name = library_name
# allow 'dynamic' creation of a new account path
account_path = os.path.join(LLMWareConfig.get_library_path(), account_name)
if not os.path.exists(account_path):
	os.makedirs(account_path,exist_ok=True)
# safety check for name based on db
safe_name = CollectionRetrieval(library_name,account_name=self.account_name).safe_name(library_name)
if safe_name != library_name:
	logger.warning(f"warning: selected library name is being changed for safety on selected resource - "
	f"{safe_name}")
if isinstance(safe_name,str):
	library_name = safe_name
	self.library_name = safe_name
else:
	raise InvalidNameException(library_name)

self.library_main_path = os.path.join(LLMWareConfig.get_library_path(), account_name, library_name)

# add new file dir for this collection
self.file_copy_path = os.path.join(self.library_main_path,"uploads" + os.sep )
self.image_path = os.path.join(self.library_main_path, "images" + os.sep)
self.dataset_path = os.path.join(self.library_main_path, "datasets" + os.sep)
self.nlp_path = os.path.join(self.library_main_path, "nlp" + os.sep)
self.output_path = os.path.join(self.library_main_path, "output" + os.sep)
self.tmp_path = os.path.join(self.library_main_path, "tmp" + os.sep)
self.embedding_path = os.path.join(self.library_main_path, "embedding" + os.sep)

library_folder = os.path.exists(self.library_main_path)

# this is a new library to create -> build file paths for work products

if not library_folder:
	os.mkdir(self.library_main_path)
	os.mkdir(self.file_copy_path)
	os.mkdir(self.image_path)
	os.mkdir(self.dataset_path)
	os.mkdir(self.nlp_path)
	os.mkdir(self.output_path)
	os.mkdir(self.tmp_path)
	os.mkdir(self.embedding_path)
	os.chmod(self.dataset_path, 0o777)
	os.chmod(self.nlp_path, 0o777)
	os.chmod(self.output_path, 0o777)
	os.chmod(self.tmp_path, 0o777)
	os.chmod(self.embedding_path, 0o777)

  

new_library_entry = {"library_name": self.library_name,
# track embedding status - each embedding tracked as new dict in list
# --by default, when library created, no embedding in place
"embedding": [{"embedding_status": "no", "embedding_model": "none", "embedding_db": "none",
"embedded_blocks":0, "embedding_dims":0, "time_stamp": "NA"}],
# knowledge graph
"knowledge_graph": "no",
# doc trackers
"unique_doc_id": 0, "documents": 0, "blocks": 0, "images": 0, "pages": 0, "tables": 0, 
# options to create and set different accounts
"account_name": self.account_name
}

# LibraryCatalog will register the new library card
new_library_card = LibraryCatalog(self).create_new_library_card(new_library_entry)

if CollectionWriter(self.library_name,account_name=self.account_name).check_if_table_build_required():
	CollectionWriter(self.library_name,account_name=self.account_name).create_table(self.library_name, self.library_block_schema)

# update collection text index in collection after adding documents
CollectionWriter(self.library_name,account_name=self.account_name).build_text_index()

return self

```
通过*create_new_library*创建知识库后，本demo通过*load_sample_files*拉去预设的文档资源并且解压，最后返回解压后资源的路径，你也可以在这一步传入自定义路径，指向你的私人资源库。

## 文档解析和分块
后面的*parsing_output = library.add_files(ingestion_folder_path)* 是一个关键的实现
add_files涉及关键的**解析、文本分块和索引文件夹中的所有文件**这几个逻辑
* 将根据文件扩展名自动路由到正确的解析器
* 支持的文件扩展名：. pdf、.pptx、.docx、.xlsx、.csv、.md、.txt、.json、.wav和.zip、.jpg、.png
我们来看下这个函数的具体实现：

```python
def add_files (self, input_folder_path=None, encoding="utf-8",chunk_size=400,
get_images=True,get_tables=True, smart_chunking=1, max_chunk_size=600,
table_grid=True, get_header_text=True, table_strategy=1, strip_header=False,
verbose_level=2, copy_files_to_library=True, set_custom_logging=-1,
use_logging_file=False):

  

"""Main method to integrate documents into a Library - pass a local filepath folder and all files will be
routed to appropriate parser by file type extension.

Parameters

----------

input_folder_path : str, default=None
The path to the folder containing files to be ingested. If not provided, defaults to None.

encoding : str, default="utf-8"
The encoding to use for reading files.

chunk_size : int, default=400
The size of text chunks to create during parsing.
  
get_images : bool, default=True
Whether to extract images from the documents.
  
get_tables : bool, default=True
Whether to extract tables from the documents.
  
smart_chunking : int, default=1
The strategy for smart chunking of text.

max_chunk_size : int, default=600
The maximum size of text chunks.

table_grid : bool, default=True
Whether to use a grid for tables.

get_header_text : bool, default=True
Whether to extract header text from the documents.

table_strategy : int, default=1
The strategy to use for table extraction.

strip_header : bool, default=False
Whether to strip headers from the documents.

verbose_level : int, default=2
The level of verbosity for logging.

copy_files_to_library : bool, default=True
Whether to copy the files to the library.

set_custom_logging : int, default=-1, will apply a custom logging level between 0-50 for the
parsing job.

use_logging_file : bool, default=False
Whether parse should log to stdout (default) or to file (set to True)

Returns

-------

output_results : dict or None

A dictionary containing the results of the document integration process, including counts of added documents,

blocks, images, pages, tables, and rejected files. If the library card could not be identified, returns None.

"""

  
if not input_folder_path:
	input_folder_path = LLMWareConfig.get_input_path()

# get overall counters at start of process
lib_counters_before = self.get_library_card()

parsing_results = Parser(library=self, encoding=encoding, chunk_size=chunk_size,
max_chunk_size=max_chunk_size, smart_chunking=smart_chunking, get_tables=get_tables, get_images=get_images, get_header_text=get_header_text,
table_strategy=table_strategy, strip_header=strip_header, table_grid=table_grid,
verbose_level=verbose_level, copy_files_to_library=copy_files_to_library,
set_custom_logging=set_custom_logging, use_logging_file=use_logging_file).ingest(input_folder_path,dupe_check=True)

logger.debug(f"update: parsing results - {parsing_results}")

# post-processing: get the updated lib_counters
lib_counters_after = self.get_library_card()

# parsing_results = {"processed_files" | "rejected_files" | "duplicate_files"}
output_results = None

if lib_counters_after and lib_counters_before:
	output_results = {"docs_added": lib_counters_after["documents"] - lib_counters_before["documents"],
	"blocks_added": lib_counters_after["blocks"] - lib_counters_before["blocks"],
	"images_added": lib_counters_after["images"] - lib_counters_before["images"],
	"pages_added": lib_counters_after["pages"] - lib_counters_before["pages"],
	"tables_added": lib_counters_after["tables"] - lib_counters_before["tables"],
	"rejected_files": parsing_results["rejected_files"]}
else:
	logger.error("error: unexpected - could not identify the library_card correctly")

logger.info(f"update: output_results - {output_results}")

# update collection text index in collection after adding documents
# LibraryCollection(self).create_index()
CollectionWriter(self.library_name,account_name=self.account_name).build_text_index()
return output_results

```
这段代码定义了一个名为`add_files`的方法，用于将文档整合到一个库中。该方法接受多个参数，包括输入文件夹路径、编码方式、文本块大小、是否提取图像和表格等。如果未提供输入文件夹路径，则使用默认路径。方法首先获取处理前的库计数器，然后使用`Parser`进行文档解析和处理，最后获取处理后的库计数器，并根据前后计数器的差异生成输出结果字典，其中包含添加的文档、块、图像、页面、表格数量以及被拒绝的文件数量。如果无法正确识别库卡片，则返回`None`。最后，方法更新了库中的文本索引。

其中的根据具体文档格式来解析，分块的逻辑在`Parser`模块中，`Parser` 模块是 llmware 框架中负责文档解析和文本分块的核心组件。它能够处理多种文件格式，将非结构化数据转换为结构化的文本块，为后续的检索和分析提供基础。

作者推荐下面的方式来调用parser模块:

```python
parsing_results = Parser(library=self, encoding=encoding, chunk_size=chunk_size,
max_chunk_size=max_chunk_size, smart_chunking=smart_chunking, get_tables=get_tables, get_images=get_images, get_header_text=get_header_text,
table_strategy=table_strategy, strip_header=strip_header, table_grid=table_grid,
verbose_level=verbose_level, copy_files_to_library=copy_files_to_library,
set_custom_logging=set_custom_logging, use_logging_file=use_logging_file).ingest(input_folder_path,dupe_check=True)
```
即在Parser实例化后即刻调用`ingest`成员方法，无需根据具体的文档类型来调用具体的解析方法。

```python
def ingest (self, input_folder_path, dupe_check=True):

""" Main method for large-scale parsing. Takes only a single input which is the local input folder path
containing the files to be parsed.
Optional dupe_check parameter set to True to restrict ingesting a file with the same name as a file
already in the library. """

# input_folder_path = where the input files are located

# first - confirm that library and connection to collection db are in place
if not self.library or not self.parse_to_db:

logger.error("error: Parser().ingest() method requires loading a library, e.g., "
"Parser(library=my_library), and a connection to a document data store - please "
"try Parse().parse_one set of methods to parse a document of any type directly into "
"list of dictionaries in memory, and written to /parser_history as a .json file")
  
parsing_results = {"processed_files": 0, "rejected_files": 0, "duplicate_files": []}
return parsing_results

  

# prepares workspace for individual parsers
self._setup_workspace(self.parser_tmp_folder)
# collate and sort the file types in the work path
work_order = self._collator(input_folder_path, dupe_check=dupe_check)
  
# write to db - True only if library loaded + collection connect in place
write_to_db = self.parse_to_db 

if work_order["office"] > 0:
	self.parse_office(self.office_work_folder, save_history=False)
	if self.copy_files_to_library:
		self.uploads(self.office_work_folder)
  
if work_order["pdf"] > 0:
	self.parse_pdf(self.pdf_work_folder, save_history=False)
	if self.copy_files_to_library:
		self.uploads(self.pdf_work_folder)

if work_order["text"] > 0:
	self.parse_text(self.text_work_folder, save_history=False)
	if self.copy_files_to_library:
		self.uploads(self.text_work_folder)

if work_order["ocr"] > 0:
	self.parse_image(self.ocr_work_folder, save_history=False)
	if self.copy_files_to_library:
		self.uploads(self.ocr_work_folder)

  
if work_order["voice"] > 0:
	self.parse_voice(self.voice_work_folder, save_history=False)
	if self.copy_files_to_library:
		self.uploads(self.voice_work_folder)

# need to systematically capture list of rejected docs
processed, not_processed = self.input_ingestion_comparison(work_order["file_list"])

parsing_results = {"processed_files": processed,
"rejected_files": not_processed,
"duplicate_files": work_order["duplicate_files"]}

return parsing_results
```

`ingest`的方法用于大规模文件解析。该方法接收输入文件夹路径和一个可选的重复检查参数。首先检查是否有库和连接到数据库，如果没有则报错。然后准备工作空间，整理工作路径中的文件类型。根据不同的文件类型（如 office 文件、pdf、文本、图像、语音等）进行相应的解析操作。最后比较输入文件列表，统计已处理文件、未处理文件和重复文件数量，并以字典形式返回结果。

至于不同类似的文档解析方法，这个文档不再深入，以pdf parser为例子，llmware只是提供了上层的调用方法和参数设置，具体的解析/分块是通过c动态库来完成的。后续会专门开一篇文章，来详细扒一下llmware的各个类型的文档解析和分块都是怎么做的。（flag ++）

## 构建文档索引
文档索引在llmware中通过`CollectionWriter`这个核心类的`build_text_index`方法来实现：

```python
CollectionWriter(self.library_name,account_name=self.account_name).build_text_index()
```

CollectionWriter 是 llmware 框架中的一个核心类，它负责管理对底层文本集合索引的写入、编辑和删除操作。从代码注释中可以看出：

> "CollectionWriter is the main class abstraction for writing, editing, and deleting new elements to the underlying text collection index - calling functions should use CollectionWriter, which will route and manage the connection to the underlying DB resource"

简单来说，CollectionWriter 是一个抽象层，它封装了与不同数据库后端（MongoDB、PostgreSQL、SQLite）的交互细节，提供了一个统一的接口来操作文本集合。

根据代码分析，CollectionWriter 类提供了以下主要功能：

1. 创建和管理表/集合：

	- check_if_table_build_required()：检查是否需要创建表
	- create_table()：创建新表
	- destroy_collection()：删除集合

2. 记录管理：

	- write_new_record()：写入新记录
	- write_new_parsing_record()：写入新的解析记录
	- update_block()：更新文本块
	- update_one_record()：更新单条记录
	- replace_record()：替换记录
	- delete_record_by_key()：根据键删除记录

3. 库卡片管理：

	- update_library_card()：更新库卡片（库的元数据）
	- get_and_increment_doc_id()：获取并递增文档ID
	- set_incremental_docs_blocks_images()：增量更新库的文档、块和图像计数

4. 嵌入向量管理：
	- add_new_embedding_flag()：添加新的嵌入标志
	- unset_embedding_flag()：取消设置嵌入标志

5. 索引管理：
	- build_text_index()：构建文本索引，这是我们重点关注的方法

`build_text_index` 方法是 `CollectionWriter` 类的一个关键方法，它负责在文本集合上构建索引，以加速后续的文本查询。`build_text_index` 具体的逻辑在`MongoDB`，`PostgreSQL`和`SQLite`这些具体的writer实现上，上层调用把这些底层细节封装了。
上述的解析，分块和索引完成后，相关的索引信息可以通过library提供的统一接口来查询获取，比如通过`get_library_card`查询文档源信息，或者根据输入的查询检索相关的召回文本。比如这个demo最后一步是运行一个测试查询。

## 测试查询

```python
query_results = Query(library).text_query(test_query, result_count=10)
```
text_query大体做了下面的工作：
1. 准备查询：如果 exact_mode 为 True，调用 exact_query_prep 方法将查询字符串转换为精确匹配格式（用双引号包围）。
2. 执行查询：调用 CollectionRetrieval 类的 basic_query 方法执行实际的数据库查询：
	CollectionRetrieval是 llmware 框架中的一个核心类，它负责从底层数据库中检索文本集合。它是一个抽象层，封装了与不同数据库后端（MongoDB、PostgreSQL、SQLite）的交互细节。
3. 处理结果：调用内部方法 _cursor_to_qr 将数据库游标转换为结构化的查询结果：
	_cursor_to_qr 方法是 text_query 的核心辅助方法，它负责将数据库游标转换为结构化的查询结果：这个方法执行以下操作：

	1. 遍历游标中的每个结果
	2. 使用 locate_query_match 方法找出查询字符串在文本中的精确位置
	3. 添加元数据（页码、分数等）
	4. 构建输出字典，包含所有请求的返回键
	5. 跟踪文档ID和文件名
	6. 如果达到结果数量限制且不需要遍历所有结果，则退出循环
	7. 创建结果字典并返回


```markdown
Example - Parsing Files into Library

Step 1 - creating library example1_library
INFO: Setup - sample_files path already exists - /Users/bytedance/llmware_data/sample_files

Step 2 - loading the llmware sample files and saving at: /Users/bytedance/llmware_data/sample_files

Step 3 - parsing and indexing files from /Users/bytedance/llmware_data/sample_files/Agreements
INFO: update:  Duplicate files (skipped): 15
INFO: update:  Total uploaded: 0

Step 4 - completed parsing - {'docs_added': 0, 'blocks_added': 0, 'images_added': 0, 'pages_added': 0, 'tables_added': 0, 'rejected_files': []}

Step 5 - updated library card - documents - 15 - blocks - 2211 - {'_id': 2, 'library_name': 'example1_library', 'embedding': [{'embedding_status': 'no', 'embedding_model': 'none', 'embedding_db': 'none', 'embedded_blocks': 0, 'embedding_dims': 0, 'time_stamp': 'NA'}], 'knowledge_graph': 'no', 'unique_doc_id': 15, 'documents': 15, 'blocks': 2211, 'images': 0, 'pages': 204, 'tables': 0, 'account_name': 'llmware'}

Step 6 - library artifacts - including extracted images - saved at folder path - /Users/bytedance/llmware_data/accounts/llmware/example1_library

Step 7 - running a test query - base salary

query results:  0 {'query': 'base salary', '_id': '471', 'text': " Base Salary. For all the services rendered by Executive hereunder, during the Employment Period,   Employer shall pay Executive a base salary at the annual rate of $200,000, payable semimonthly in   accordance with Employer's normal payroll practices. Executive's base salary shall be reviewed annually   by the Board (or the compensation committee of the Board), pursuant to Employer's normal   compensation ", 'doc_ID': 4, 'block_ID': 33, 'page_num': 3, 'content_type': 'text', 'author_or_speaker': '', 'special_field1': '', 'file_source': 'Persephone EXECUTIVE EMPLOYMENT AGREEMENT.pdf', 'added_to_collection': 'Sat Mar  8 23:18:13 2025', 'table': '', 'coords_x': 427, 'coords_y': -1681, 'coords_cx': 2, 'coords_cy': 122, 'external_files': '', 'score': -8.71512754073446, 'similarity': 0.0, 'distance': 0.0, 'matches': [[1, 'base'], [6, 'salary'], [131, 'base'], [136, 'salary'], [265, 'base'], [270, 'salary']], 'account_name': 'llmware', 'library_name': 'example1_library'}
...
```

##  总结

本文主要介绍了使用 llmware 库创建知识库并进行文档解析、分块和索引的过程，以及测试查询功能。从一个简单示例 “example--1--create_first_library.py” 开始，详细阐述了构建知识库并执行基本文本查询的各个步骤和相关模块的细节：
* **LLMWareConfig** 配置类：负责管理 llmware 框架的全局配置，包括文件路径管理、数据库配置、日志配置和工作空间设置等方面。
* 创建知识库（Library）：**Library** 类是 llmware 的核心组织结构，提供统一接口管理非结构化信息集合。介绍了创建知识库的过程，包括安全检查、初始化路径和目录、创建库条目和卡片等。
* 文档解析和分块：add_files 方法是关键实现，涉及解析、文本分块和索引文件夹中的所有文件，根据文件扩展名自动路由到正确的解析器，支持多种文件扩展名。**Parser** 模块负责文档解析和文本分块，ingest 方法用于大规模文件解析。
* 构建文档索引：通过 **CollectionWriter** 类的 build_text_index 方法实现文档索引，该类封装了与不同数据库后端的交互细节，提供统一接口操作文本集合。
* 测试查询：使用**CollectionRetrieval**核心类执行文本 Query 。

这篇文章并未深入到各个核心类的具体实现，而是通过一次完整的demo调用来一瞥llmware中比较重要的几个核心类，在后续的文章，会对这些核心类做专门的解析。


```mermaid
flowchart TD
    A[文章总结：llmware库的使用] --> B[LLMWareConfig配置类]
    A --> C[创建知识库（Library）]
    A --> D[文档解析和分块]
    A --> E[构建文档索引]
    A --> F[测试查询]
    B --> B1[文件路径管理]
    B --> B2[数据库配置]
    B --> B3[日志配置]
    B --> B4[工作空间设置]
    C --> C1[核心特点]
    C --> C2[创建知识库的过程]
    C1 --> C11[组织结构]
    C1 --> C12[元数据管理]
    C1 --> C13[文件系统结构]
    C2 --> C21[安全检查]
    C2 --> C22[初始化路径和目录]
    C2 --> C23[创建库条目和卡片]
    D --> D1[add_files方法]
    D --> D2[Parser模块]
    D1 --> D11[自动路由解析器]
    D1 --> D12[支持的文件扩展名]
    D2 --> D21[ingest方法]
    E --> E1[CollectionWriter类]
    E1 --> E11[主要功能]
    E11 --> E111[创建和管理表/集合]
    E11 --> E112[记录管理]
    E11 --> E113[库卡片管理]
    E11 --> E114[嵌入向量管理]
    E11 --> E115[索引管理]
    F --> F1[text_query方法]
    F1 --> F11[准备查询]
    F1 --> F12[执行查询]
    F1 --> F13[处理结果]
    F13 --> F131[遍历游标]
    F13 --> F132[找出查询字符串位置]
    F13 --> F133[添加元数据]
    F13 --> F134[构建输出字典]
    F13 --> F135[跟踪文档ID和文件名]
    F13 --> F136[达到结果数量限制处理]
    F13 --> F137[创建结果字典并返回]
``````