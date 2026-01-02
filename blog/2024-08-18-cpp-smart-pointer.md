---
title: 一文简介C++智能指针
slug: cpp-smart-pointer
authors: [jiajiewu]
tags: [编程语言]
keywords: ["blog", "C++", "智能指针"]
description: "C++中的智能指针是自动化内存管理的一种方式。本文会介绍C++智能指针的类型，以及每种类型的使用场景。"
draft: false
---

一般情况下，当我们在堆上申请内存和释放内存，我们需要显式调用new和delete。智能指针是自动化该过程的一种方式。智能指针意味着当你调用new时（甚至不用显式调用new），你不必调用delete。智能指针本质上是一个真正原始指针的包装器。当你创建一个智能指针时，它会调用new并为你分配内存。然后根据您使用的智能指针，内存将在某个时候自动释放。

<!-- truncate -->

## unique_ptr

`unique_ptr`是C++11标准引入的一种智能指针，用于管理动态分配的资源，以防止内存泄漏。它是一种独占式的所有权的指针，这意味着一个`unique_ptr`实例拥有对对象的唯一所有权，不能与其他`unique_ptr`类型的指针共享所指对象的内存。`unique_ptr`定义在作用域类的指针，超出作用域以后会自动触发实例析构。

构造一个`unique_ptr`的方式如下，建议使用`std::make_unique` ，除了避免显示使用`new` 的操作，`std::make_unique` 会通过一些方式来保证抛出异常时不会发生内存泄漏，比如构造函数和析构函数都声明为`noexcept` 。

```cpp
std::unique_ptr<Entity> entity(new Entity());
// 提供异常安全的版本是std::make_unique<Entity>()
// ✔ 更建议用make_unique的方式
std::unique_ptr<Entity> entity = std::make_unique<Entity>();
```

但注意不能使用隐式转换来构造：

```cpp
// ❌ 不能使用隐式转换来构造
// no suitable constructor exists to convert from "Entity *" to "std::unique_ptr<Entity, std::default_delete<Entity>>"C/C++(415
std::unique_ptr<Entity> entity = new Entity();
```

查看`unique_ptr`的声明可以看到，其构造函数声明为`explicit` ，意味着不允许隐式转换。此外，`unique_ptr`的**拷贝构造函数**和**拷贝赋值操作符都声明为**`delete` ，即禁止这两个操作。

```cpp
_CONSTEXPR23 explicit unique_ptr(pointer _Ptr) noexcept : _Mypair(_Zero_then_variadic_args_t{}, _Ptr) {}

unique_ptr(const unique_ptr&)            = delete;
unique_ptr& operator=(const unique_ptr&) = delete;
```

下面是一个简单的例子

```cpp
#include <iostream>
#include <memory>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }    
};

int main()
{
		// unique_ptr的作用域
    {
        // std::unique_ptr<Entity> entity(new Entity());
        // 提供异常安全的版本是std::make_unique<Entity>()
        std::unique_ptr<Entity> entity = std::make_unique<Entity>();
        std::cout << "in scope" << std::endl;
    }
    // 超出unique_ptr的作用域，触发Entity的析构
    std::cout << "out of scope" << std::endl;
    std::cin.get();
    return 0;
}
```

上面的程序的log输出如下：

```cpp
Default constructor called
in scope
Destructor called
out of scope
```

`unique_ptr`是我们拥有的最简单的智能指针。它非常有用，而且开销非常低。它只是一个堆栈分配的对象。当堆栈分配的对象死亡时，它将调用删除指针并释放内存。

对于复杂的对象，使用智能指针默认的析构函数可能还不够(默认的析构函数会调用`delete`操作，但显然单是`delete`操作并不使用所有场景)，这时候我们可以使用lambda函数自定义一个删除器：在`std::unique_ptr<Entity, std::function<void(Entity*)>>`此时要求我们传入删除器的类型：

```cpp
#include <iostream>
#include <memory>
#include <functional>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }    
};

int main()
{
    // unique_ptr的作用域
    {
        std::unique_ptr<Entity, std::function<void(Entity*)>> intPtr(new Entity, [](Entity* ptr) 
        {
            std::cout << "Custom deleter called" << std::endl;
            delete ptr; // 实际删除操作，可以替换为其他的删除逻辑
        });
        std::cout << "in scope" << std::endl;
    }
    // 超出unique_ptr的作用域，触发Entity的析构
    std::cout << "out of scope" << std::endl;
    std::cin.get();
    return 0;
}
```

log输出如下：

```cpp
Default constructor called
in scope
Custom deleter called
Destructor called
out of scope
```

我们也可以使用`decltype` 关键字来拿到删除器的类型，这要求我们提前定义好lambda函数：

```cpp
#include <iostream>
#include <memory>
#include <functional>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }    
};

int main()
{
    // 将 lambda 表达式存储在 std::function 对象中，以便可以作为删除器使用
    std::function<void(Entity*)> deleter = [](Entity* ptr) 
    {
        std::cout << "Custom deleter called" << std::endl;
        delete ptr; // 实际删除操作，可以替换为其他的删除逻辑
    };

    // unique_ptr的作用域
    {
        std::unique_ptr<Entity, decltype(deleter)> intPtr(new Entity, deleter);
        std::cout << "in scope" << std::endl;
    }
    // 超出unique_ptr的作用域，触发Entity的析构
    std::cout << "out of scope" << std::endl;
    std::cin.get();
    return 0;
}
```

<aside>
📌 unique_ptr是很轻量级的智能指针，在不需要考虑拷贝和复制操作的场景，可以使用它而不是new和delete。

</aside>

## shared_ptr

如果想复制或者共享指针，也许把它传递给一个函数或者让另一个类存储它，`unique_ptr`并不适用。`shared_ptr` 使用引用计数机制来跟踪有多少个 `shared_ptr` 实例共享同一个对象。当一个 `shared_ptr` 被创建或复制时，它引用的对象的引用计数会增加；当 `shared_ptr` 被销毁或被重新赋值时，引用计数会减少。当引用计数降到零时，意味着没有任何 `shared_ptr` 实例引用该对象，对象将被自动删除，其内存被释放。

```cpp
#include <iostream>
#include <memory>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }    
};

int main()
{
    // 这两种方式都不建议选用，这会导致内存两次内存分配
        // std::shared_ptr<Entity> entity(new Entity());
        // std::shared_ptr<Entity> entity = new Entity();
        std::shared_ptr<Entity> entity = std::make_shared<Entity>();
        std::cout << "before in scope" << std::endl;
    {
        std::shared_ptr<Entity> entity2 = entity;
        std::cout << "in scope" << std::endl;
    }
    // 超出该作用域，尽管entity2失效，但是entity 并没有析构。
    std::cout << "out of scope" << std::endl;
    return 0;
}
```

```cpp
Default constructor called
before in scope
in scope
out of scope
Destructor called
```

`shared_ptr` 的构造、复制、赋值和析构操作都是异常安全的，即使在这些操作过程中发生异常，`shared_ptr` 也能确保对象的正确释放。但是使用`shared_ptr` 也有一些注意事项：

- **循环引用**：如果两个或多个 `shared_ptr` 实例相互引用，它们的引用计数永远不会达到零，从而导致内存泄漏。这通常需要额外的注意和设计来避免。
- **性能开销**：与 `unique_ptr` 相比，`shared_ptr` 有额外的内存和性能开销，因为它需要维护引用计数。
- **线程安全**：`shared_ptr` 的默认实现不是线程安全的。如果需要在多线程环境中使用 `shared_ptr`，可以使用 `shared_mutex` 或 `shared_lock` 来保护对引用计数的访问。

`shared_ptr` 的自定义析构函数也是类似的：

```cpp
#include <iostream>
#include <memory>
#include <functional>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }    
};

int main()
{
    // 将 lambda 表达式存储在 std::function 对象中，以便可以作为删除器使用
    std::function<void(Entity*)> deleter = [](Entity* ptr) 
    {
        std::cout << "Custom deleter called" << std::endl;
        delete ptr; // 实际删除操作，可以替换为其他的删除逻辑
    };

    std::shared_ptr<Entity> entity(new Entity, deleter);
    return 0;
}
```

关于 `shared_ptr` 还有一个常用的用法：`std**::**enable_shared_from_this` 。当有些场景要求你从一个对象中返回一个`shared_ptr` 时，如果直接通过this指针来构造`shared_ptr` 是不安全的，下面举一个稍微极端的例子，主要是想说明在一个对象中返回智能指针的不恰当操作：

```cpp
#include <iostream>
#include <memory>
#include <functional>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }

    std::shared_ptr<Entity> getShareObject()
    {
        return std::shared_ptr<Entity>(this);
    }
};

int main()
{
    std::shared_ptr<Entity> entity2;
    {
        Entity entity;
        entity2 = entity.getShareObject();
    }
    std::cout << entity2.use_count() << std::endl;
    return 0;
}
```

这个例子中，log输出如下：

```cpp
Default constructor called
Destructor called
1
Destructor called

[Done] exited with code=3221226356 in 0.812 seconds
```

局部对象`entity` 试图返回一个`shared_ptr` ，这个意图在一些场景是好的，比如在多线程操作中，我们希望把对象送到其他线程执行，并且不希望在执行过程中对象的生命周期还是正常的。但在这个例子中，当超出局部作用域，`entity` 就会析构了，`entity2`  在程序结束时再析构一遍，由于它们指向的是同一份内存地址，这会触发非定义的行为。

如果想在对象中返回一个`shared_ptr` ，正确的操作是使用`std::enable_shared_from_this` ：

```cpp
_EXPORT_STD template <class _Ty>
class enable_shared_from_this { // provide member functions that create shared_ptr to this
public:
    using _Esft_type = enable_shared_from_this;

    _NODISCARD shared_ptr<_Ty> shared_from_this() {
        return shared_ptr<_Ty>(_Wptr);
    }

    _NODISCARD shared_ptr<const _Ty> shared_from_this() const {
        return shared_ptr<const _Ty>(_Wptr);
    }

    _NODISCARD weak_ptr<_Ty> weak_from_this() noexcept {
        return _Wptr;
    }

    _NODISCARD weak_ptr<const _Ty> weak_from_this() const noexcept {
        return _Wptr;
    }

protected:
    constexpr enable_shared_from_this() noexcept : _Wptr() {}

    enable_shared_from_this(const enable_shared_from_this&) noexcept : _Wptr() {
        // construct (must value-initialize _Wptr)
    }

    enable_shared_from_this& operator=(const enable_shared_from_this&) noexcept { // assign (must not change _Wptr)
        return *this;
    }

    ~enable_shared_from_this() = default;

private:
    template <class _Yty>
    friend class shared_ptr;

    mutable weak_ptr<_Ty> _Wptr;
};
```

在模板类 `enable_shared_from_this`  中持有一个`_Wptr` ，它是一个`weak_ptr` （不会增加引用计数）。`_Ty` 是我们的目标类型。其构造函数`constexpr enable_shared_from_this() noexcept : _Wptr() {}` 声明为`protected` ，这意味着模板类 `enable_shared_from_this`  作为基类使用，其他类从它派生。当调用`shared_from_this` 时，会基于`_Wptr` 转换为`shared_ptr` 并返回。

```cpp
#include <iostream>
#include <memory>

class Entity : public std::enable_shared_from_this<Entity>
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }

    std::shared_ptr<Entity> getShareObject()
    {
        return shared_from_this();
    }
};

int main()
{
    std::shared_ptr<Entity> entity2;
    {
        auto entity = std::make_shared<Entity>();
        entity2 = entity->getShareObject();
        std::cout << entity2.use_count() << std::endl;
    }
    std::cout << entity2.use_count() << std::endl;
    return 0;
}
```

这个程序的输出是：

```cpp
Default constructor called
2
1
Destructor called
```

在我们的例子中，它要求`class Entity` 得从`enable_shared_from_this`  中派生，调用者不会写出`Entity entity;` 或者`Entity* entity = new Entity();`的实现，因为会触发编译报错。

<aside>
📌 如果在Entity中要求实现返回shared_ptr 的行为，请从enable_shared_from_this 中派生Entity ，这能避免很多不规范的调用引发的非定义行为。
</aside>

## weak_ptr

`weak_ptr`和`shared_ptr`类似，但是和`shared_ptr`不同的是，它不增加引用计数。在某些场景，如果你不想拥有实体的所有权，适合使用`weak_ptr`，就像你可能存储了一个实体列表，但你并不真正关心它们是否有效，事实上`weak_ptr`并不会去保证某个对象是否有效。

```cpp
#include <iostream>
#include <memory>

class Entity
{
    public: 
    Entity() 
    {
        std::cout << "Default constructor called" << std::endl;
    }
    virtual ~Entity() 
    {
        std::cout << "Destructor called" << std::endl;
    }    
};

int main()
{
        std::weak_ptr<Entity> entity;
        std::cout << "before in scope" << std::endl;
    {
        auto entity2 = std::make_shared<Entity>();
        entity = entity2;
        std::cout << "in scope" << std::endl;
    }
    std::cout << "out of scope" << std::endl;
    if (entity.expired())
    {
        std::cout << "use_count of entity is 0" << std::endl;
    }
    else
    {
        std::cout << "use_count of entity is " << entity.use_count() << std::endl;
    }
    return 0;
}
```

```cpp
before in scope
Default constructor called
in scope
Destructor called
out of scope
use_count of entity is 0
```

在上面的例子中，超出局部作用域之后，`entity2`  引用计数清零并触发析构，此时`entity` 不指向任何内存对象。

<aside>
📌 weak_ptr 在需要访问内存对象，但不影响内存对象生命周期管理的场景下使用，比如避免循环引用，观察者模式，回调函数，缓存机制，资源管理等等。

</aside>

# 📎 参考与延申

[【44】【Cherno C++】【中字】C++的智能指针_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1hv411W7kX/?spm_id_from=333.999.0.0)

[C++里std::enable_shared_from_this是干什么用的？](https://zhuanlan.zhihu.com/p/393571228)

[Kimi.ai - 帮你看更大的世界](https://kimi.moonshot.cn/)