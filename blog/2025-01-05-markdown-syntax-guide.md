---
slug: markdown-syntax-guide
title: Markdown 常用语法记录
authors: [jiajiewu]
tags: [markdown, tutorial, documentation]
---

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 HTML 文档。本文将系统地总结 Markdown 的各种语法用法，帮助你更好地掌握这个强大的文档编写工具。

<!-- truncate -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';


## 基础语法

### 标题和目录（TOC）

#### 1. Markdown 标题

Markdown 支持使用 `#` 符号创建不同级别的标题：

```md
## 二级标题
### 三级标题
#### 四级标题
```


## 扩展语法 {#extension-syntax}

### 标题 ID

每个标题都会自动生成一个 ID，用于链接跳转。你可以：

#### 自动生成的 ID

```md
### 你好世界
<!-- 自动生成 ID: "你好世界" -->
```

使用方法：

```md
[链接到基础语法标题](#基础语法)
```
[链接到基础语法标题](#基础语法)


#### 自定义 ID

```md
## 扩展语法 {#extension-syntax}
<!-- 使用自定义 ID: "extension-syntax" -->
```

使用方法：
```md
[链接到扩展语法标题](#extension-syntax)
```
[链接到扩展语法标题](#extension-syntax)


### 代码块增强

Docusaurus 为代码块提供了强大的增强功能。

#### 1. 代码标题

可以为代码块添加标题：

````md
```jsx title="/src/components/HelloWorld.js"
function HelloWorld(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
````

```jsx title="/src/components/HelloWorld.js"
function HelloWorld(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 2. 语法高亮

** 基本用法 **
代码块会自动根据语言进行语法高亮：

````md
```js
console.log('自动语法高亮');
```
````

```js
console.log('自动语法高亮');
```


#### 3. 行高亮

可以使用特殊注释来高亮代码行：

````md
```js
function highlightDemo() {
  // highlight-next-line
  const highlighted = 'This line is highlighted';
  // highlight-start
  const multipleLines = [
    'These',
    'lines',
    'are',
    'highlighted',
  ];
  // highlight-end
}
```
````

```js
function highlightDemo() {
  // highlight-next-line
  const highlighted = 'This line is highlighted';
  // highlight-start
  const multipleLines = [
    'These',
    'lines',
    'are',
    'highlighted',
  ];
  // highlight-end
}
```

#### 4. 多语言代码块

以下是一个简单的多语言代码示例：

````md

<Tabs>
<TabItem value="js" label="JavaScript">

```js
function greet() {
  console.log('Hello!');
}
```

</TabItem>
<TabItem value="py" label="Python">

```python
def greet():
    print("Hello!")
```

</TabItem>
</Tabs>
````



<Tabs>
<TabItem value="js" label="JavaScript">

```js
function greet() {
  console.log('Hello!');
}
```

</TabItem>
<TabItem value="py" label="Python">

```python
def greet():
    print("Hello!")
```

</TabItem>
</Tabs>


#### 5. 实时代码编辑演示

这个页面展示了 Docusaurus 的实时代码编辑功能。

** 简单的 React 组件 **

你可以编辑下面的代码，更改会实时显示：

````md

```jsx live
function Clock(props) {
  const [date, setDate] = React.useState(new Date());
  
  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>现在时间是：{date.toLocaleTimeString()}</h2>
    </div>
  );
}
```
````

```jsx live
function Clock(props) {
  const [date, setDate] = React.useState(new Date());
  
  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>现在时间是：{date.toLocaleTimeString()}</h2>
    </div>
  );
}
```

** 按钮示例 **

这是一个简单的按钮组件示例：

````md

```jsx live
function ButtonExample() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#25c2a0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        点击次数：{count}
      </button>
    </div>
  );
}
```
````

```jsx live
function ButtonExample() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#25c2a0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        点击次数：{count}
      </button>
    </div>
  );
}
```

**使用说明**

1. 上面的代码块都是可以编辑的
2. 更改代码后，右侧的预览会立即更新
3. 你可以尝试修改文本、样式或添加新的功能
4. 如果代码有错误，预览区域会显示错误信息

**注意事项**

1. 代码高亮：
   - 默认支持常用语言
   - 可以通过配置添加更多语言支持
   - 可以自定义高亮主题

2. 行高亮：
   - 可以使用注释或行号进行标记
   - 可以自定义高亮颜色

3. JSX 使用：
   - 在 JSX 中需要使用 `<CodeBlock>` 组件
   - 支持所有 Markdown 代码块的功能 

### 提示框（Admonitions）

Docusaurus 提供了一种特殊的提示框语法，通过使用三个冒号和标签类型来创建不同样式的提示框。

#### 1. 基本用法

```md
:::note

这是一个**普通**提示框，支持 _Markdown_ 语法。

:::

:::tip

这是一个**提示**框，用于展示提示信息。

:::

:::info

这是一个**信息**框，用于展示一般信息。

:::

:::warning

这是一个**警告**框，用于展示警告信息。

:::

:::danger

这是一个**危险**框，用于展示危险警告。

:::
```

:::note

这是一个**普通**提示框，支持 _Markdown_ 语法。

:::

:::tip

这是一个**提示**框，用于展示提示信息。

:::

:::info

这是一个**信息**框，用于展示一般信息。

:::

:::warning

这是一个**警告**框，用于展示警告信息。

:::

:::danger

这是一个**危险**框，用于展示危险警告。

:::

#### 2. 自定义标题

可以为提示框添加自定义标题：

```md
:::note[自定义标题]

这里是提示框的内容。标题支持 **Markdown** 语法。

:::
```

:::note[自定义标题]

这里是提示框的内容。标题支持 **Markdown** 语法。

:::

#### 3. 嵌套提示框

提示框可以嵌套使用，每一层增加一个冒号：

```md
:::::info[父级提示框]

这是父级内容

::::warning[子级提示框]

这是子级内容

:::tip[深层提示框]

这是深层内容

:::

::::

:::::
```

:::::info[父级提示框]

这是父级内容

::::warning[子级提示框]

这是子级内容

:::tip[深层提示框]

这是深层内容

:::

::::

:::::

#### 4. 在 MDX 中使用

提示框中可以使用 MDX 组件：

```jsx
:::tip[使用标签页]

<Tabs>
  <TabItem value="apple" label="苹果">这是一个苹果 🍎</TabItem>
  <TabItem value="orange" label="橙子">这是一个橙子 🍊</TabItem>
</Tabs>

:::
```

:::tip[使用标签页]

<Tabs>
  <TabItem value="apple" label="苹果">这是一个苹果 🍎</TabItem>
  <TabItem value="orange" label="橙子">这是一个橙子 🍊</TabItem>
</Tabs>

:::


**注意事项**

1. Prettier 格式化：
   - 在提示框指令周围添加空行以避免格式化问题
   - 错误示例：
     ```md
     :::note
     内容
     :::
     ```
   - 正确示例：
     ```md
     :::note

     内容

     :::
     ```

2. 提示框类型：
   - `note`: 普通提示
   - `tip`: 小技巧
   - `info`: 信息
   - `warning`: 警告
   - `danger`: 危险

3. 自定义功能：
   - 可以通过配置自定义提示框样式
   - 支持自定义图标
   - 可以创建自定义类型的提示框 