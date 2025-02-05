---
title: 一文简介C++左/右值引用以及移动语义
slug: lvalue-rvalue-move-semantics
authors: [jiajiewu]
tags: [C++, 编码架构]
keywords: ["blog", "C++", "左值", "右值", "移动语义"]
description: "C++中的左值引用（lvalue reference）和右值引用（rvalue reference），以及移动语义（move semantics），都是为了提高程序性能和效率而设计的语言特性。本文会介绍左值引用和右值引用的使用形式，以及基于右值引用的移动语义的使用样例。"
draft: false
---

C++中的左值引用（lvalue reference）和右值引用（rvalue reference），以及移动语义（move semantics），都是为了提高程序性能和效率而设计的语言特性。本文会介绍左值引用和右值引用的使用形式，以及基于右值引用的移动语义的使用样例。

本文的总结主要来自于cherno的C++系列视频，可以在bilibili观看翻译的中文版本。


[神经元猫的个人空间-神经元猫个人主页-哔哩哔哩视频](https://space.bilibili.com/364152971/channel/collectiondetail?sid=13909)

<!-- truncate -->

# 左值引用和右值引用

## 左值和右值

很多人将左值定义为有地址的值，一些临时对象/字面量（没有地址）定义为右值。下面代码中的`i`是左值，它有实际的内存地址，`10`是右值，它只是一个字面量，没有内存地址。

```cpp
#include <iostream>

int main
{
	int i = 10;
	
	// i = 20; ✅非常量的左值可以被赋值
	// 10 = i; ❎右值没有实际的内存地址，不可执行赋值操作
	// int a = i; ✅ 左值i可以赋值给另外一个左值a
	return 0;
}

```

## 左值引用和右值引用

当我们在一个函数调用中返回一个左值的引用，就可以把另外一个左值或者右值赋予给它，能够真正地修改这个左值内存地址中实际存储的值。比如下面的例子有三个`GetValue` 的版本，当调用`GetValue() = 5;` 时，只有`版本3`能编译通过。

```cpp
#include <iostream>

// 版本1：返回一个右值
int GetValue()
{
	return 10;
}

// 版本2：注意噢，这里返回的仍然是一个右值
int GetValue()
{
	static int value = 10;
	return value;
}

// 版本3：返回一个左值引用
int& GetValue()
{
	static int value = 10;
	return value;
}

int main()
{
	// 输出10
	std::cout<< "GetValue 1: "<< GetValue() << std::endl;
	GetValue() = 5;
	// 输出5
  std::cout<< "GetValue 2: "<< GetValue() << std::endl;
	return 0;
}

```

有一点需要特别注意，非常量的**左值引用的初始值必须是一个左值**：

```cpp
void SetValue(int& value)
{

}

int main()
{ 
	// ❎非常量的左值引用value，它的初始值不能接受是一个右值。
  SetValue(5);
  
  int a = 5;
  SetValue(a); // ✅非常量的左值引用value，它的初始值接受是一个左值。
	return 0;
}
```

但如果左值引用是常量的，情况稍微有点不同,在这个场景下，编译器会基于这个右值`5`定义一个临时左值变量`temp`，并赋值给左值引用`value` 。

```cpp
// 编译器先定义一个左值temp：int temp = 5; 
// 再把左值temp赋值给value：const int& value = temp;
void SetValue(const int& value)
{

}

int main()
{ 
	// ✅当一个右值赋值给一个常量的左值引用value，编译器会悄悄做一些事情。
  SetValue(5);
	return 0;
}
```

所以很多情况下，我们会把一个不需要修改的函数入参定义为常量引用`const T&` ,这允许这个函数的入参接受左值和右值，而不太需要关注其中的区别。

似乎总是使用常量的左值引用就可以了，它可以接受左值和右值的传入，但有一些场景，如果你明确知道传入函数的变量只是一些临时对象，你可以显示地把它定义为右值引用（使用形式是 `T&&`），这个实现的性能更优，而且这个函数会拒绝左值对象的传入。

```cpp
#include <iostream>

// 版本1：接受左值和右值作为入参
void PrintName(const std::string& name)
{
    std::cout << "[lvalue] "<< name << std::endl;
}

// 版本2：只接受右值
void PrintName(std::string&& name)
{
    std::cout << "[rvalue] " << name << std::endl;
}

int main()
{
    std::string firstName = "Yan";
    std::string lastName = "Chernikov";

    PrintName(firstName); // 打印 [lvalue] Yan
    PrintName(firstName + lastName); // 打印 [rvalue] YanChernikov
}

```

在上面的示例中，编译器会选择`版本1` 的`PrintName` 来处理左值，而选择`版本2` 的`PrintName` 来处理右值，虽然`版本1` 也是可以处理右值的，但还记得上面提到的，编译器需要定义一个临时的左值`temp` 来处理这个情况，这意味着额外的开销。使用右值引用避免了不必要的开销。此外，如果我们明确传入的是右值，它不会存在太长的时间，以及在代码的其他地方被持有，我们可以简单地把这个对象的资源“偷走”给其他的拷贝对象，无需关系这些操作以后，原始对象是否完整。这个技巧在移动语义（下文有介绍）中得到广泛使用。

## 总结

- 左值有实际的内存地址，而右值没有。
- 不可以使用右值来初始化非常量的左值引用。
- 可以使用右值来初始化常量的左值引用，编译器会做一些额外的操作保证能编译通过。
- 使用常量的左值引用`const T&`是简便的，它可以处理左值和右值作为参数传入。
- 在明确的只需要接受一个右值的情况下，请使用右值引用`T&&`，它性能更好。

# 移动语义

当需要把一个对象传入函数中，而这个函数需要得到这个对象的所有权，一般情况下，这个对象的构造函数仍然会被调用到，以构造一个一次性对象，并把这个一次性对象复制到正在调用的函数当中。如果我们省掉构造临时对象并复制它的操作，而是直接移动该对象，性能会更好，移动语义就是为此服务。在类对象中，移动语义经常应用的地方是**移动构造函数（Move Constructor）和移动赋值操作符（Move Assignment Operator）。**但在介绍移动语义之前，我们先看下在这两个函数缺省的情况下，把对象传入另外一个函数需要触发哪些操作。

```cpp
#include <iostream>
#include <cstring>

class String
{
public:
    String() = default;
    String(const char* string)
    {
        std::cout<<"Created!"<<std::endl;
        m_size = strlen(string);
        m_Data = new char[m_size];
        memcpy(m_Data, string, m_size);
    }
    String(const String& other)
    {
        std::cout<<"Copied!"<<std::endl;
        m_size = other.m_size;
        m_Data = new char[m_size];
        memcpy(m_Data, other.m_Data, m_size);
    }
    ~String()
    {
        std::cout<<"Deleted!"<<std::endl;
        delete[] m_Data;
    }

    void Print()
    {
        for (uint32_t i = 0; i < m_size; i++)
        {
            printf("%c", m_Data[i]);
        }
        printf("\n");
    }

private:
    char* m_Data;
    uint32_t m_size;
};

class Entity
{
public:
    Entity(const String& name)
        : m_Name(name)
        {
        }

    void PrintName()
    {
        m_Name.Print();
    }

private:
    String m_Name;
};

int main()
{
    Entity entity(String("cherno"));
    entity.PrintName();
    return 0;
}

```

这个程序的输出是：

```
Created!
Copied!
Deleted!
cherno
Deleted!
```

意味着`Entity entity(String("cherno"));` 这行会首先调用`String` 的构造函数，构造一个一次性对象，再把这个对象拷贝到`Entity` 类对象的私有成员对象`m_Name`中，之后一次性对象会析构，接下来`entity.PrintName();` 会打印`cherno` ，整体的函数执行完之后，随着`Entity`的析构，私有成员`m_Name` 的析构触发最后一次的`Deleted!` 打印。

因为在main函数的`Entity entity(String("cherno"));` 调用中，我们知道`Stirng(”cherno”)`只是一个临时对象，不需要关心构造之后的所有权归属到哪方的问题，如果我们想剩下中间的`Copied!` 和第一次`Deleted!` 的开销，移动语义就可以派上用场了。

## 移动构造函数

```cpp
class String
{
public:
    ...
    // 需要非常注意，因为我们需要偷走原始的资源，需要把
    // 原始对象置空，不然在原始对象析构时，触发的析构函数
    // 对把另一个对象的内存数据也清空，因为这里的move实现，
    // 只是用新的指针指向的原来的内存数据而已
    String(String&& other)
    {
			  std::cout<<"Moved!"<<std::endl;
        m_size = other.m_size;
        m_Data = other.m_Data;
        other.m_size = 0;
        other.m_Data = nullptr;
    }
    ...
};

class Entity
{
		...
		// 这里需要注意，String&& name是右值引用（值类型），
    // 右值引用的值类型其实还是个左值（可以取&操作符）
    // 所以在给m_Name初始化时，需要类型转换一下，不然其实
    // 还是会触发String的构造函数，而不是右值引用构造函数
    Entity(String&& name)
        : m_Name((String&&)name)
        {
        }

    ...
};
```

我们可以在`Entity` 中定义一个右值引用构造函数，当使用临时对象构造`Entity` 时调用该函数，并且在`String` 中定义一个移动构造函数。上面的函数定义中有两点需要注意：一是移动构造函数需要把原始对象置空，防止原始对象的析构函数调用时，把内存数据清空；二是右值引用的值类型是左值，如果预期把它当作一个右值再传递，需要类型转换一下。

上面的程序调用的输出结果是：

```cpp
Created!
Moved!
Deleted!
cherno
Deleted!
```

通过移动构造函数，我们节省了一次拷贝操作，并且在第一次`Deleted` 操作时，并没有实际上清空内存中的数据。

上面提到，当把右值引用再次当作右值传递时，需要类型转换，其实`std::move`就是干这件事情的，查看`std::move` 的定义，是把一个类型`_Ty` 通过`static_cast` 转换成`_Ty&&` 的形式。

```cpp
_EXPORT_STD template <class _Ty>
_NODISCARD _MSVC_INTRINSIC constexpr remove_reference_t<_Ty>&& move(_Ty&& _Arg) noexcept {
    return static_cast<remove_reference_t<_Ty>&&>(_Arg);
}
```

所以`Entity` 的移动构造函数还可以写成：

```cpp
Entity(String&& name)
	  : m_Name(std::move(name))
	  {
	  }
```

## 移动**赋值操作符**

当想把一个临时对象移动到一个新对象时，上一小节介绍了移动构造函数。当想把一个临时对象移动到另一个已有的对象时，可以使用**移动赋值操作符**`operator=`**。**我们直接看下面的例子：

```cpp
class String
{
public:
    ...
    String& operator= (String&& other)
    {
        if (&other != this)
        {
            delete[] m_Data;
        }
        std::cout<<"Moved Assignment!"<<std::endl;
        m_size = other.m_size;
        m_Data = other.m_Data;
        other.m_size = 0;
        other.m_Data = nullptr;
        return *this;
    }
		...
};

class Entity
{
public:
    ...
    Entity& operator= (Entity&& other)
    {
        m_Name = std::move(other.m_Name);
        return *this;
    }
		...
    
};

int main()
{
    Entity entity1(String("cherno"));
    Entity entity2;
    std::cout<< "entity1: ";
    entity1.PrintName();
    std::cout<< "entity2: ";
    entity2.PrintName();
    entity2 = std::move(entity1);
    std::cout<< "entity1: ";
    entity1.PrintName();
    std::cout<< "entity2: ";
    entity2.PrintName();
    return 0;
}
```

上面的`String` 实现的移动赋值操作符，和移动构造函数没有太多区别，最重要的区别是：由于`entity2` 是一个已经构造了的对象，它的`m_Data`中可能已经有一些默认值了，如果我们直接调用`m_Data = other.m_Data;` 就会导致内存泄漏，正确的方式是在重新指向其他内存时，先删除原始内存的数据，但是为了防止类似`entity1 = std::move(entity1);` 这种移动向自身的操作时误删除内存数据，需要增加一个判别逻辑：

```cpp
String& operator= (String&& other)
  {
      if (&other != this)
      {
          delete[] m_Data;
      }
      ...
      return *this; //记得有返回值
  }
```

新增**移动赋值操作符**之后，函数的打印输出是：

```cpp
Created!
Moved!
Deleted!
entity1: cherno
entity2: 
Moved Assignment!
entity1: 
entity2: cherno
Deleted!
Deleted!
```

前三行我们已经知道在调用`Entity entity1(String("cherno"));` 时触发的打印，中间五行是触发了**移动赋值操作符**之后数据做了交换，我们实现了目的，并且没有触发额外的构造函数。需要注意的是，上面的函数中，**我们只定义了移动赋值操作符，没有实现赋值操作符，**所以我们在`main`函数中调用时需要显式地调用`std::move`。

## 完整的代码实例

```cpp
#include <iostream>
#include <cstring>

class String
{
public:
    String() = default;
    String(const char* string)
    {
        std::cout<<"Created!"<<std::endl;
        m_size = strlen(string);
        m_Data = new char[m_size];
        memcpy(m_Data, string, m_size);
    }
    String(const String& other)
    {
        std::cout<<"Copied!"<<std::endl;
        m_size = other.m_size;
        m_Data = new char[m_size];
        memcpy(m_Data, other.m_Data, m_size);
    }
    String(String&& other)
    {
        std::cout<<"Moved!"<<std::endl;
        m_size = other.m_size;
        m_Data = other.m_Data;

        // 需要非常注意，因为我们需要偷走原始的资源，需要把
        // 原始对象置空，不然在原始对象析构时，触发的析构函数
        // 对把另一个对象的内存数据也清空，因为这里的move实现，
        // 只是用新的指针指向的原来的内存数据而已
        other.m_size = 0;
        other.m_Data = nullptr;
    }

    String& operator= (String&& other)
    {
        if (&other != this)
        {
            delete[] m_Data;
        }
        std::cout<<"Moved Assignment!"<<std::endl;
        m_size = other.m_size;
        m_Data = other.m_Data;
        other.m_size = 0;
        other.m_Data = nullptr;
        return *this;
    }

    ~String()
    {
        std::cout<<"Deleted!"<<std::endl;
        delete[] m_Data;
    }

    void Print()
    {
        for (uint32_t i = 0; i < m_size; i++)
        {
            printf("%c", m_Data[i]);
        }
        printf("\n");
    }

private:
    char* m_Data;
    uint32_t m_size;
};

class Entity
{
public:
    Entity() = default;
    Entity(const String& name)
        : m_Name(name)
        {
        }
    
    // 这里需要注意，String&& name是右值引用（值类型），
    // 右值引用的值类型其实还是个左值（可以取&操作符）
    // 所以在给m_Name初始化时，需要类型转换一下，不然其实
    // 还是会触发String的构造函数，而不是右值引用构造函数
    Entity(String&& name)
        : m_Name(std::move(name))
        {
        }

    Entity& operator= (Entity&& other)
    {
        m_Name = std::move(other.m_Name);
        return *this;
    }

    void PrintName()
    {
        m_Name.Print();
    }

private:
    String m_Name;
};

int main()
{
    Entity entity1(String("cherno"));
    Entity entity2;
    std::cout<< "entity1: ";
    entity1.PrintName();
    std::cout<< "entity2: ";
    entity2.PrintName();
    entity2 = std::move(entity1);
    std::cout<< "entity1: ";
    entity1.PrintName();
    std::cout<< "entity2: ";
    entity2.PrintName();
    return 0;
}

```

# 全文的概念总结

通过上面的概念解释，应该能比较清楚地了解了左值、右值、左值引用、右值引用、移动语义这些概念了。本小节是对其中一些概念的重新概括，文本生成由kimi chat给出。由于这些概念与一个类常见的几个函数（**拷贝构造函数**，**拷贝赋值操作符，析构函数，移动构造函数，移动构造函数**）相关，下面也给出了C++领域的三五法则的使用建议。

## 左值引用（Lvalue Reference）

左值引用是C++98中引入的概念，它允许变量引用另一个已经存在的对象。左值引用的主要作用是：

1. **提供对对象的别名**：左值引用可以作为已有对象的别名，允许对原始对象进行修改。
2. **函数参数传递**：通过左值引用传递给函数的参数，可以使得函数能够修改传入的对象。
3. **避免拷贝**：对于大型对象或资源密集型对象，使用左值引用可以避免在函数调用时进行对象拷贝，从而提高效率。

## 右值引用（Rvalue Reference）

右值引用是C++11中引入的新特性，用于引用临时对象或即将“消失”的值。右值引用的作用包括：

1. **移动语义**：右值引用允许资源的转移（move），而不是拷贝。这意味着可以将临时对象的资源直接转移给另一个对象，而不是创建新的资源副本，从而节省内存和CPU资源。
2. **优化性能**：通过右值引用，可以优化那些返回局部对象的函数，避免不必要的对象拷贝，特别是在容器操作中，如`std::vector`的`emplace_back`方法。
3. **完美转发**：在模板编程中，右值引用可以用于完美转发，保持参数的值类别（左值或右值），这对于库设计和泛型编程非常有用。

## 移动语义（Move Semantics）

移动语义是利用右值引用来实现的一种性能优化技术，其主要作用是：

1. **减少不必要的拷贝**：移动语义允许对象在转移资源时避免进行昂贵的内存拷贝操作，特别是在涉及到大型数据结构或资源管理（如文件句柄、网络连接）时，这种优化尤为显著。
2. **提高效率**：移动构造函数和移动赋值操作符使得对象可以在不涉及资源拷贝的情况下“借用”临时对象的资源，这样可以提高程序的运行效率。
3. **支持资源回收**：移动语义还支持资源的回收，当一个对象的资源被移动后，原对象通常会将资源指针设置为`nullptr`，这样可以在原对象析构时避免重复释放资源。

总的来说，左值引用和右值引用以及移动语义都是为了更高效地处理对象的生命周期，特别是在对象创建、修改和销毁的过程中，它们使得C++程序员能够更好地控制资源分配和释放，从而提高程序的性能。

## 三五法则

C++的"三五法则"（Rule of Three/Five）是一种关于资源管理的指导原则，用于指导C++程序员何时需要定义特定的特殊成员函数。这个法则主要关注以下几个方面：

1. **拷贝构造函数（Copy Constructor）**：如果你需要自定义拷贝构造函数，通常是因为你的类管理了需要深拷贝的资源（如动态分配的内存）。如果没有自定义拷贝构造函数，编译器生成的默认拷贝构造函数会执行浅拷贝，这可能导致资源泄露或其他问题。
2. **拷贝赋值操作符（Copy Assignment Operator）**：与拷贝构造函数类似，如果你定义了拷贝构造函数，通常也需要定义拷贝赋值操作符来保持类的一致性和正确性。自定义拷贝赋值操作符可以确保资源被正确地复制或移动，并且旧对象的资源得到适当释放。
3. **析构函数（Destructor）**：如果你的类管理了资源（如动态内存），你需要定义析构函数来释放这些资源。如果没有自定义析构函数，编译器生成的默认析构函数可能不会释放资源，导致资源泄露。
4. **移动构造函数（Move Constructor）和移动赋值操作符（Move Assignment Operator）**：在C++11及以后的版本中，如果你的类使用了动态资源，通常也需要定义移动构造函数和移动赋值操作符。这些特殊成员函数可以利用右值引用来转移资源的所有权，从而避免不必要的拷贝，提高效率。

"三五法则"建议，如果你需要自定义上述任何一个特殊成员函数，通常最好定义所有相关的特殊成员函数，以保持类的一致性和正确性。这是因为这些函数在类的资源管理中扮演着互补的角色。例如，如果你自定义了拷贝构造函数来处理深拷贝，但没有定义拷贝赋值操作符，那么使用赋值操作符时可能会发生错误，因为默认的拷贝赋值操作符可能不会正确处理资源的复制。

简而言之，"三五法则"是一种资源管理的最佳实践，它指导C++开发者在定义类时如何处理资源的拷贝、移动和释放，以确保资源的正确管理并避免内存泄漏等问题。

# 📎 参考与延申

拓展阅读

[C++ Rvalue References Explained](http://thbecker.net/articles/rvalue_references/section_01.html)

[The rule of three/five/zero - cppreference.com](https://en.cppreference.com/w/cpp/language/rule_of_three)

参考链接

[【85】【Cherno C++】【中字】C++的左值与右值_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Aq4y1t73p/?spm_id_from=333.788&vd_source=442af0da8e57c49017d2a3e36b38014c)

[【89】【Cherno C++】【中字】C++移动语义_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1BZ4y1R7KF/?spm_id_from=333.788&vd_source=442af0da8e57c49017d2a3e36b38014c)

[【90】【Cherno C++】【中字】stdmove与移动赋值操作符_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Ma411C7Xa/?spm_id_from=333.788&vd_source=442af0da8e57c49017d2a3e36b38014c)

[C++移动语义 详细讲解【Cherno C++教程】 - zhangyi1357 - 博客园](https://www.cnblogs.com/zhangyi1357/p/16018810.html)