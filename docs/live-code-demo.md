# 实时代码编辑演示

这个页面展示了 Docusaurus 的实时代码编辑功能。

## 简单的 React 组件

你可以编辑下面的代码，更改会实时显示：

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

## 按钮示例

这是一个简单的按钮组件示例：

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

## 使用说明

1. 上面的代码块都是可以编辑的
2. 更改代码后，右侧的预览会立即更新
3. 你可以尝试修改文本、样式或添加新的功能
4. 如果代码有错误，预览区域会显示错误信息 