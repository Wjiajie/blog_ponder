---
title: C++常用设计模式
slug: cpp-design-pattern
authors: [jiajiewu]
tags: [软件架构]
keywords: ["blog", "C++", "设计模式"]
description: "本文介绍了C++设计模式的六大原则，包括单一职责、里氏替换、依赖倒置、接口隔离、迪米特法则和开放封闭原则，并对常用的设计模式进行分类讲解。"
draft: false
---
import ZoomImage from '@site/src/components/ZoomImage';

本文介绍了C++设计模式的六大原则，包括单一职责、里氏替换、依赖倒置、接口隔离、迪米特法则和开放封闭原则，并对常用的设计模式进行分类讲解。

<!-- truncate -->

## 设计模式的六大原则

- 单一职责原则（SRP，Single Responsibility Principle）

> 一个类应该仅有一个引起它变化的原因。
变化的方向隐含着类的责任。
> 
- 里氏替换原则（LSP，Liskov Substitution Principle）

> 子类必须能够替换它们的基类(IS-A)。
继承表达类型抽象。
> 
- 依赖倒置原则（DIP，Dependence Inversion Principle）

> 高层模块(稳定)不应该依赖于低层模块(变化)，二者都应该依赖
于抽象(稳定) 。
抽象(稳定)不应该依赖于实现细节(变化) ，实现细节应该依赖于
抽象(稳定)。
> 
- 接口隔离原则（ISP，Interface Segregation Principle）

> 不应该强迫客户程序依赖它们不用的方法。
接口应该小而完备。
> 
- 迪米特法则（LoD，Law of Demeter）

> 一个对象应该对其他对象保持最少的了解。
> 
- 开放封闭原则（OCP，Open Close Principle）

> 对扩展开放，对更改封闭。
类模块应该是可扩展的，但是不可修改。
> 

具体可以看[设计模式六大原则](http://www.uml.org.cn/sjms/201211023.asp)

## 几个常用的设计模式

具体阅读：[设计模式目录](https://refactoringguru.cn/design-patterns/catalog)

把几个常用的设计模式分为： 创建型模式， 结构型模式， 行为模式三类

1. 创建型模式

### 创建型模式--单例模式(Singleton)

单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

```cpp
class Singleton{
private:
    Singleton();
    Singleton(const Singleton& other);
public:
    static Singleton* getInstance();
    static Singleton* m_instance;
};

Singleton* Singleton::m_instance=nullptr;

//线程非安全版本
Singleton* Singleton::getInstance() {
    if (m_instance == nullptr) {
        m_instance = new Singleton();
    }
    return m_instance;
}

//线程安全版本，但锁的代价过高
Singleton* Singleton::getInstance() {
    Lock lock;
    if (m_instance == nullptr) {
        m_instance = new Singleton();
    }
    return m_instance;
}

//双检查锁，但由于内存读写reorder不安全
Singleton* Singleton::getInstance() {

    if(m_instance==nullptr){
        Lock lock;
        if (m_instance == nullptr) {
            m_instance = new Singleton();
        }
    }
    return m_instance;
}

//C++ 11版本之后的跨平台实现 (volatile)
std::atomic<Singleton*> Singleton::m_instance;
std::mutex Singleton::m_mutex;

Singleton* Singleton::getInstance() {
    Singleton* tmp = m_instance.load(std::memory_order_relaxed);
    std::atomic_thread_fence(std::memory_order_acquire);//获取内存fence
    if (tmp == nullptr) {
        std::lock_guard<std::mutex> lock(m_mutex);
        tmp = m_instance.load(std::memory_order_relaxed);
        if (tmp == nullptr) {
            tmp = new Singleton;
            std::atomic_thread_fence(std::memory_order_release);//释放内存fence
            m_instance.store(tmp, std::memory_order_relaxed);
        }
    }
    return tmp;
}

```

### 创建型模式--工厂模式(Factory)

> 在软件系统中，经常面临着创建对象的工作；由于需求的变化，
需要创建的对象的具体类型经常变化。
如何应对这种变化？如何绕过常规的对象创建方法(new)，提供一
种“封装机制”来避免客户程序和这种“具体对象创建工作”的紧
耦合？
> 

> 定义一个用于创建对象的接口，让子类决定实例化哪一个类。
Factory Method使得一个类的实例化延迟（目的：解耦，
手段：虚函数）到子类。
> 

`ISplitterFactory.cpp`

```cpp
//抽象类
class ISplitter{
public:
    virtual void split()=0;
    virtual ~ISplitter(){}
};

//工厂基类
class SplitterFactory{
public:
    virtual ISplitter* CreateSplitter()=0;
    virtual ~SplitterFactory(){}
};

```

```cpp
class MainForm : public Form
{
    SplitterFactory*  factory;//工厂

public:

    MainForm(SplitterFactory*  factory){
        this->factory=factory;
    }

	void Button1_Click(){

		ISplitter * splitter=
            factory->CreateSplitter(); //多态new

        splitter->split();

	}
};

```

### 创建型模式--抽象工厂模式(Abstract Factory)

> 在软件系统中，经常面临着“一系列相互依赖的对象”的创建工
作；同时，由于需求的变化，往往存在更多系列对象的创建工作。
如何应对这种变化？如何绕过常规的对象创建方法(new)，提供一
种“封装机制”来避免客户程序和这种“多系列具体对象创建工作”
的紧耦合？
> 

抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。

> 提供一个接口，让该接口负责创建一系列“相关或者相互依
赖的对象”，无需指定它们具体的类。
> 

```cpp
//数据库访问有关的基类
class IDBConnection{

};

class IDBCommand{

};

class IDataReader{

};

class IDBFactory{
public:
    virtual IDBConnection* CreateDBConnection()=0;
    virtual IDBCommand* CreateDBCommand()=0;
    virtual IDataReader* CreateDataReader()=0;

};

//支持SQL Server
class SqlConnection: public IDBConnection{

};
class SqlCommand: public IDBCommand{

};
class SqlDataReader: public IDataReader{

};

class SqlDBFactory:public IDBFactory{
public:
    virtual IDBConnection* CreateDBConnection()=0;
    virtual IDBCommand* CreateDBCommand()=0;
    virtual IDataReader* CreateDataReader()=0;

};

//支持Oracle
class OracleConnection: public IDBConnection{

};

class OracleCommand: public IDBCommand{

};

class OracleDataReader: public IDataReader{

};

class EmployeeDAO{
    IDBFactory* dbFactory;

public:
	EmployeeDAO(IDBFactory* dbFactory){
	this->dbFactory = dbFactory;
	}
    vector<EmployeeDO> GetEmployees(){
        IDBConnection* connection =
            dbFactory->CreateDBConnection();
        connection->ConnectionString("...");

        IDBCommand* command =
            dbFactory->CreateDBCommand();
        command->CommandText("...");
        command->SetConnection(connection); //关联性

        IDBDataReader* reader = command->ExecuteReader(); //关联性
        while (reader->Read()){

        }
    }
};

```

1. 结构型模式

### 结构型模式-- 适配模式(Adapter)

适配器模式是一种结构型设计模式， 它能使接口不兼容的对象能够相互合作。

> 将一个类的接口转换成客户希望的另一个接口。Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作
> 

```cpp
//目标接口（新接口）
class ITarget{
public:
    virtual void process()=0;
};

//遗留接口（老接口）
class IAdaptee{
public:
    virtual void foo(int data)=0;
    virtual int bar()=0;
};

//遗留类型
class OldClass: public IAdaptee{
    //....
};

//对象适配器
class Adapter: public ITarget{ //继承
protected:
    IAdaptee* pAdaptee;//组合

public:

    Adapter(IAdaptee* pAdaptee){
        this->pAdaptee=pAdaptee;
    }

    virtual void process(){
        int data=pAdaptee->bar();
        pAdaptee->foo(data);

    }

};

//类适配器
class Adapter: public ITarget,
               protected OldClass{ //多继承

}

int main(){
    IAdaptee* pAdaptee=new OldClass();

    ITarget* pTarget=new Adapter(pAdaptee);
    pTarget->process();

}

class stack{
    deqeue container;

};

class queue{
    deqeue container;

};

```

### 结构型模式--桥接模式(Bridge)

桥接模式是一种结构型设计模式， 可将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构， 从而能在开发时分别使用。

> 由于某些类型的固有的实现逻辑，使得它们具有两个变化的维度，
乃至多个纬度的变化。
如何应对这种“多维度的变化”？如何利用面向对象技术来使得
类型可以轻松地沿着两个乃至多个方向变化，而不引入额外的复杂
度？
> 

> 将抽象部分(业务功能)与实现部分(平台实现)分离，使它们
都可以独立地变化。
> 

```cpp
class Messager{
protected:
    //不向用户开放该接口
    //通过组合的形式，把两个类连接起来(桥模式)
    MessagerImp* m_messagerImp;//...
    Messager(MessagerImp* messagerImp):m_messagerImp(messagerImp){};
public:
    virtual void Login(string username, string password)=0;
    virtual void SendMessage(string message)=0;
    virtual void SendPicture(Image image)=0;

    virtual ~Messager(){}
};

class MessagerImp{
public:
    virtual void PlaySound()=0;
    virtual void DrawShape()=0;
    virtual void WriteText()=0;
    virtual void Connect()=0;

    virtual MessagerImp(){}
};

//平台实现 n
class PCMessagerImp : public MessagerImp{
public:

    virtual void PlaySound(){
        //**********
    }
    virtual void DrawShape(){
        //**********
    }
    virtual void WriteText(){
        //**********
    }
    virtual void Connect(){
        //**********
    }
};

class MobileMessagerImp : public MessagerImp{
public:

    virtual void PlaySound(){
        //==========
    }
    virtual void DrawShape(){
        //==========
    }
    virtual void WriteText(){
        //==========
    }
    virtual void Connect(){
        //==========
    }
};

//业务抽象 m

//类的数目：1+n+m

class MessagerLite :public Messager {

public:

    virtual void Login(string username, string password){

        messagerImp->Connect();
        //........
    }
    virtual void SendMessage(string message){

        messagerImp->WriteText();
        //........
    }
    virtual void SendPicture(Image image){

        messagerImp->DrawShape();
        //........
    }
};

class MessagerPerfect  :public Messager {

public:

    virtual void Login(string username, string password){

        messagerImp->PlaySound();
        //********
        messagerImp->Connect();
        //........
    }
    virtual void SendMessage(string message){

        messagerImp->PlaySound();
        //********
        messagerImp->WriteText();
        //........
    }
    virtual void SendPicture(Image image){

        messagerImp->PlaySound();
        //********
        messagerImp->DrawShape();
        //........
    }
};

void Process(){
    //运行时装配
    MessagerImp* mImp=new PCMessagerImp();
    Messager *m =new Messager(mImp);
}

```

### 结构型模式--装饰模式(Decorator)

> 在某些情况下我们可能会“过度地使用继承来扩展对象的功能”，
由于继承为类型引入的静态特质，使得这种扩展方式缺乏灵活性；
并且随着子类的增多（扩展功能的增多），各种子类的组合（扩展
功能的组合）会导致更多子类的膨胀。
如何使“对象功能的扩展”能够根据需要来动态地实现？同时避
免“扩展功能的增多”带来的子类膨胀问题？从而使得任何“功能
扩展变化”所导致的影响将为最低？
> 

> 动态（组合）地给一个对象增加一些额外的职责。就增加功
能而言，Decorator模式比生成子类（继承）更为灵活（消
除重复代码 & 减少子类个数）。
> 

```cpp
//业务操作
class Stream{

public：
    virtual char Read(int number)=0;
    virtual void Seek(int position)=0;
    virtual void Write(char data)=0;

    virtual ~Stream(){}
};

//主体类
class FileStream: public Stream{
public:
    virtual char Read(int number){
        //读文件流
    }
    virtual void Seek(int position){
        //定位文件流
    }
    virtual void Write(char data){
        //写文件流
    }

};

class NetworkStream :public Stream{
public:
    virtual char Read(int number){
        //读网络流
    }
    virtual void Seek(int position){
        //定位网络流
    }
    virtual void Write(char data){
        //写网络流
    }

};

class MemoryStream :public Stream{
public:
    virtual char Read(int number){
        //读内存流
    }
    virtual void Seek(int position){
        //定位内存流
    }
    virtual void Write(char data){
        //写内存流
    }

};

//扩展操作
//装饰流
DecoratorStream: public Stream{
protected:
    Stream* stream;//...

    DecoratorStream(Stream * stm):stream(stm){

    }

};

//加密流
class CryptoStream: public DecoratorStream {

public:
    CryptoStream(Stream* stm):DecoratorStream(stm){

    }

    virtual char Read(int number){

        //额外的加密操作...
        stream->Read(number);//读文件流
    }
    virtual void Seek(int position){
        //额外的加密操作...
        stream::Seek(position);//定位文件流
        //额外的加密操作...
    }
    virtual void Write(byte data){
        //额外的加密操作...
        stream::Write(data);//写文件流
        //额外的加密操作...
    }
};

class BufferedStream : public DecoratorStream{

    // Stream* stream;//...

public:
    BufferedStream(Stream* stm):DecoratorStream(stm){

    }
    //...
};

void Process(){

    //运行时装配
    FileStream* s1=new FileStream();
    //实际上是CryptoFileStream
    CryptoStream* s2=new CryptoStream(s1);
    //实际上是BufferedFileStream
    BufferedStream* s3=new BufferedStream(s1);
    //实际上是CryptoBufferedFileStream
    BufferedStream* s4=new BufferedStream(s2);

}

```

1. 行为模式

### 行为模式--观察者模式(Observer)

观察者模式是一种行为设计模式， 允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。

> 在软件构建过程中，我们需要为某些对象建立一种“通知依赖关
系” ——一个对象（目标对象）的状态发生改变，所有的依赖对
象（观察者对象）都将得到通知。如果这样的依赖关系过于紧密，
将使软件不能很好地抵御变化。
使用面向对象技术，可以将这种依赖关系弱化，并形成一种稳定
的依赖关系。从而实现软件体系结构的松耦合。
> 

```cpp
class IProgress{
public:
	virtual void DoProgress(float value)=0;
	virtual ~IProgress(){}
};

class FileSplitter
{
	string m_filePath;
	int m_fileNumber;

	List<IProgress*>  m_iprogressList; // 该对象的订阅列表

public:
	FileSplitter(const string& filePath, int fileNumber) :
		m_filePath(filePath),
		m_fileNumber(fileNumber){

	}

	void split(){

		//1.do something...

		for (int i = 0; i < m_fileNumber; i++){
			//...

			float progressValue = m_fileNumber;
			progressValue = (i + 1) / progressValue;
			onProgress(progressValue);
		}

	}

	void addIProgress(IProgress* iprogress){
		m_iprogressList.push_back(iprogress);
	}

	void removeIProgress(IProgress* iprogress){
		m_iprogressList.remove(iprogress);
	}

protected:
	virtual void onProgress(float value){

		List<IProgress*>::iterator itor=m_iprogressList.begin();

		while (itor != m_iprogressList.end() )
			(*itor)->DoProgress(value);
			itor++;
		}
	}
};

```

```cpp
class MainForm : public Form, public IProgress
{
	TextBox* txtFilePath;
	TextBox* txtFileNumber;

	ProgressBar* progressBar;

public:
	void Button1_Click(){

		string filePath = txtFilePath->getText();
		int number = atoi(txtFileNumber->getText().c_str());

		ConsoleNotifier cn;

		FileSplitter splitter(filePath, number);

		splitter.addIProgress(this); //添加订阅
		splitter.addIProgress(&cn); //添加订阅
		//split事件发生后， 通知多个 “观察” 该对象的其他对象。(即各种IProgress对象)
		splitter.split();

		splitter.removeIProgress(this); //取消订阅

	}

	virtual void DoProgress(float value){
		progressBar->setValue(value);
	}
};

class ConsoleNotifier : public IProgress {
public:
	virtual void DoProgress(float value){
		cout << ".";
	}
};

```

### 行为模式--策略模式(Strategy)

策略模式是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。

> 在软件构建过程中，某些对象使用的算法可能多种多样，经常改
变，如果将这些算法都编码到对象中，将会使对象变得异常复杂；
而且有时候支持不使用的算法也是一个性能负担。
如何在运行时根据需要透明地更改对象的算法？将算法与对象本
身解耦，从而避免上述问题？
> 

```cpp
class TaxStrategy{
public:
    virtual double Calculate(const Context& context)=0;
    virtual ~TaxStrategy(){}
};

class CNTax : public TaxStrategy{
public:
    virtual double Calculate(const Context& context){
        //***********
    }
};

class USTax : public TaxStrategy{
public:
    virtual double Calculate(const Context& context){
        //***********
    }
};

class DETax : public TaxStrategy{
public:
    virtual double Calculate(const Context& context){
        //***********
    }
};

//新增一个税
//*********************************
class FRTax : public TaxStrategy{
public:
	virtual double Calculate(const Context& context){
		//.........
	}
};

class SalesOrder{
private:
    TaxStrategy* strategy;

public:
    SalesOrder(StrategyFactory* strategyFactory){
        this->strategy = strategyFactory->NewStrategy();
    }
    ~SalesOrder(){
        delete this->strategy;
    }

    public double CalculateTax(){
        //...
        Context context();

        double val =
            strategy->Calculate(context); //实例化的子类的计税方法
        //...
    }

};

```