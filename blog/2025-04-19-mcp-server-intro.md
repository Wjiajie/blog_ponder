---
title: '一文简介MCP'
slug: mcp-server-intro
authors: [jiajiewu]
tags: [mcp, 技术栈]
keywords: ["mcp", "技术栈"]
description: "本文介绍了MCP(Model Context Protocol)协议的基本概念、架构设计以及服务器端开发指南。MCP作为一种开放协议，为AI应用提供了标准化的上下文提供方式，本文将帮助读者理解如何利用MCP协议开发服务器并在Cursor等IDE中使用它。"
draft: false
---
import ZoomImage from '@site/src/components/ZoomImage';


## MCP是什么
MCP 是一种开放协议，它规范了应用程序如何向大语言模型提供上下文。可以把 MCP 想象成人工智能应用的 USB-C 端口。就像 USB-C 为连接设备与各种外设和配件提供了一种标准化方式一样，MCP 为将人工智能模型与不同的数据源和工具连接起来提供了一种标准化方式。

<!-- truncate -->

### 总体架构

在其核心部分，MCP 遵循客户端-服务器架构，其中一个主机应用程序可以连接到多个服务器。
<ZoomImage src="https://cdn.sa.net/2025/04/19/PQSXnsTZHEtApkm.png" alt="MCP架构图" />
- **MCP 主机**：像 Claude Desktop、IDE(如cursor) 或人工智能工具等希望通过 MCP 访问数据的程序。
- **MCP 客户端**：与服务器保持 1:1 连接的协议客户端。
- **MCP 服务器**：轻量级程序，每个程序都通过标准化的模型上下文协议公开特定功能，包括创建公开资源、提示和工具。
- **本地数据源**：你的计算机文件、数据库以及 MCP 服务器可以安全访问的服务。
- **远程服务**：可通过互联网使用的外部系统（例如，通过 API），MCP 服务器可以连接到这些系统。

本文侧重mcp的服务器侧的开发，以及在cursor中如何使用现有的mcp server。对mcp的客户端开发不会提及。

## MCP协议
一个简单的mcp协议如下：
```
{

  "mcpServers": {

    "weather": {

      "path": "C:/Users/jiaji/Documents/github-project/mcp/quickstart-resources/weather-server-typescript/build/index.js",

      "command": "node",

      "description": "天气查询服务，提供天气预报和警报信息",

      "displayName": "Weather Service",

      "args": []

    }

  }

}
```

- mcpServers：顶级对象，包含所有注册的MCP服务
- weather：服务的标识符，用于在MCP客户端中引用这个服务
这个weather服务具有以下配置属性：
1. path（必填）
	- 值: "C:/Users/jiaji/Documents/github-project/mcp/quickstart-resources/weather-server-typescript/build/index.js"
	- 作用: 指定天气服务JavaScript文件的完整路径
	- 说明: 这是编译后的TypeScript文件，包含了天气服务的全部逻辑
2. command（必填）
	- 值: "node"
	- 作用: 定义运行服务的命令
	- 说明: 使用Node.js运行时来执行JavaScript文件
3. description（可选）
	- 值: "天气查询服务，提供天气预报和警报信息"
	- 作用: 提供服务的功能描述
	- 说明: 中文描述让用户清楚了解这个服务提供的功能
4. displayName（可选）
	- 值: "Weather Service"
	- 作用: 在用户界面中显示的友好名称
	- 说明: 通常在UI界面上显示这个名称，而不是技术性的标识符
5. args（可选）
	- 值: []（空数组）
	- 作用: 传递给command的额外命令行参数
	- 说明: 当前配置没有提供额外参数，但可以根据需要添加

更多的协议字段介绍，请看[官网](https://modelcontextprotocol.io/introduction)的介绍。

## 在cursor上使用MCP
了解如何在 Cursor 的 Composer 功能中添加和使用自定义 MCP 工具
[模型上下文协议 (MCP)](https://modelcontextprotocol.io/introduction) 是一个开放协议，允许你在 Cursor 中为 Agentic LLM 提供自定义工具。
MCP 工具可能不适用于所有模型。MCP 工具仅在 Composer 的 Agent 中可用。
Cursor 实现了 MCP 客户端，该客户端支持任意数量的 MCP 服务器。Cursor 的 MCP 客户端支持 `stdio` 和 `sse` 传输。下面介绍`stdio`传输的方式，它能允许你调用本地运行的mcp服务器。
### 向 Cursor 添加 MCP 服务器

要向 Cursor 添加 MCP 服务器，请转到 `Cursor 设置` > `功能` > `MCP` ，然后单击 `+ 添加新的 MCP 服务器` 按钮。

这将打开一个json文件，路径在`~/.cursor/mcp.json`。
你可以先按照 [MCP 快速入门天气服务器](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-typescript) 的指引，下载并安装天气服务器到本地。
```bash
git clone git@github.com:modelcontextprotocol/quickstart-resources.git
cd quickstart-resources\weather-server-typescript
npm install
npm build
```

假设它已经构建并放置在 `~/Documents/github-project/mcp/quickstart-resources/weather-server-typescript/build/index.js` 。在这种情况下，整个命令字符串是 `node ~/mcp-quickstart/weather-server-typescript/build/index.js` ，你可以这样配置mcp的协议：

```
{

  "mcpServers": {

    "weather": {

      "path": "~/Documents/github-project/mcp/quickstart-resources/weather-server-typescript/build/index.js",

      "command": "node",

      "description": "天气查询服务，提供天气预报和警报信息",

      "displayName": "Weather Service",

      "args": []

    }

  }

}
```

<ZoomImage src="https://cdn.sa.net/2025/04/19/W31AysBhVH6ZPvK.png" alt="MCP服务器配置示例" />


添加服务器后，它应出现在 MCP 服务器列表中。你可能需要手动按下 MCP 服务器右上角的刷新按钮，才能填充工具列表。以下是加载（修改后的）天气和示例服务器后的工具列表的样子。

<ZoomImage src="https://cdn.sa.net/2025/04/19/F1pIKqWtjwd4G9b.png" alt="MCP工具列表示例" />

### 在 Agent 中使用 MCP 工具

Composer Agent 将 **自动** 使用 MCP 设置页面上 `可用工具` 下列出的任何 MCP 工具，如果它确定它们是相关的。要故意提示工具使用，只需告诉 Agent 使用该工具，可以通过名称或描述来引用它。
#### 工具批准

默认情况下，当 Agent 想要使用 MCP 工具时，它将显示一条消息，要求你批准：

<ZoomImage src="https://mintlify.s3.us-west-1.amazonaws.com/cursor/images/advanced/mcp-mars-request.png" alt="MCP工具调用批准示例" />

用户可以展开消息以查看工具调用参数。
#### Yolo 模式

你可以启用 Yolo 模式，以允许 Agent 自动运行 MCP 工具，而无需批准，类似于执行终端命令的方式。在此处阅读有关 Yolo 模式以及如何启用它的更多信息 [here](https://cursordocs.com/agent#yolo-mode) 。

### 测试结果
在对话中，输入`查询下旧金山今天的天气`：

<ZoomImage src="https://cdn.sa.net/2025/04/19/2hWiLEbPDJOKYHU.png" alt="MCP天气查询示例" />

上面是一个简单的使用流程，你可以在[awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)和[modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)中寻找感兴趣的mcp-servers，按照上述的流程集成到cursor中，如果想详细了解cursor中的mcp的能力，请访问[cursor](https://cursordocs.com/docs/context/model-context-protocol)。

## MCP天气预报工具的原理与实现流程分析

这个小节会简述一个天气预报的mcp server的实现过程，结合[ModelContextProtocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)的功能，会分为下面四个模块：

1. **工具注册**：通过SDK的`server.tool()`方法注册工具，提供名称、描述、参数定义和处理函数
2. **参数验证**：使用Zod模式验证工具输入，确保数据格式正确
3. **内容响应**：符合MCP协议的响应格式，返回结构化内容
4. **传输层**：使用标准输入输出传输层实现进程间通信

这个天气服务是MCP生态系统中的一个典型示例，展示了如何创建一个功能性的工具服务，使AI助手能够访问实时天气数据。
### 1. 基本架构

该服务基于MCP协议，使用TypeScript实现，主要组件包括：

- MCP服务器 (`McpServer`)
- 标准输入输出传输层 (`StdioServerTransport`)
- 工具注册和处理逻辑
- 外部API通信（美国国家气象局API）

### 2. 核心组件分析

#### 2.1 MCP服务器实例创建

```typescript
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
```

服务器实例化时设置了名称和版本信息，这是创建任何MCP服务的第一步。

#### 2.2 API通信功能

```typescript
async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}
```

这个辅助函数负责与美国国家气象局(NWS) API通信，发送请求并处理响应。

#### 2.3 数据模型

通过接口定义了几种主要的数据结构：

```typescript
interface AlertFeature {...}
interface ForecastPeriod {...}
interface AlertsResponse {...}
interface PointsResponse {...}
interface ForecastResponse {...}
```

这些接口定义了与API通信时使用的数据模型，包括天气警报和预报信息的结构。

### 3. 工具注册与功能实现

MCP服务器注册了两个主要工具：

#### 3.1 天气警报工具 (get-alerts)

```typescript
server.tool(
  "get-alerts",
  "Get weather alerts for a state",
  {
    state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
  },
  async ({ state }) => {
    // 实现逻辑...
  }
);
```

这个工具使用Zod验证器定义了参数规范，要求输入两个字母的州代码，然后从NWS API获取该州的天气警报信息。

#### 3.2 天气预报工具 (get-forecast)

```typescript
server.tool(
  "get-forecast",
  "Get weather forecast for a location",
  {
    latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
    longitude: z
      .number()
      .min(-180)
      .max(180)
      .describe("Longitude of the location"),
  },
  async ({ latitude, longitude }) => {
    // 实现逻辑...
  }
);
```

这个工具接收经纬度坐标，并从NWS API获取该位置的天气预报。

### 4. 工作流程详解

以天气预报工具(get-forecast)为例，完整流程如下：

1. **参数验证**：
   - 使用Zod验证输入的经纬度是否在有效范围内

2. **网格点数据获取**：
   ```typescript
   const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
   const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);
   ```
   - 首先需要调用NWS API的点位接口，获取给定坐标的网格点数据
   - 这是因为NWS API使用网格系统进行天气数据组织

3. **预报URL获取**：
   ```typescript
   const forecastUrl = pointsData.properties?.forecast;
   ```
   - 从网格点响应中提取预报URL，这是获取具体预报数据的API端点

4. **预报数据获取**：
   ```typescript
   const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
   ```
   - 使用预报URL获取详细的天气预报数据

5. **数据格式化**：
   ```typescript
   const formattedForecast = periods.map((period: ForecastPeriod) => [
     `${period.name || "Unknown"}:`,
     `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}`,
     // ...更多格式化
   ].join("\n"));
   ```
   - 将API返回的预报数据格式化为易读的文本

6. **结果返回**：
   ```typescript
   return {
     content: [
       {
         type: "text",
         text: forecastText,
       },
     ],
   };
   ```
   - 按照MCP协议格式返回结果，使AI助手可以读取和理解

### 5. 服务器启动与连接

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}
```

服务器使用`StdioServerTransport`作为通信层，这使得它可以通过标准输入输出与调用者（如AI助手）进行通信。这是MCP的常见模式，允许通过进程间通信方式实现服务交互。

### 6. 测试结果
<ZoomImage src="https://cdn.sa.net/2025/04/19/2hWiLEbPDJOKYHU.png" alt="MCP天气查询示例" />


## 参考链接
* [modelcontextprotocol.io](https://modelcontextprotocol.io/introduction)
* [cursor](https://cursordocs.com/docs/context/model-context-protocol)
* [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
* [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
* [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)

