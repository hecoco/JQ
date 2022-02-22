window.dom = {
    create(string) {
        //dom.create('<div><span>1</span></div>');
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) {//在节点后面增加兄弟节点
        node.parentNode.insertBefore(node2, node.nextSibling);
        // fu.parentNode.appendChild(zi)
    },
    before(node, node2) {//在节点前面增加兄弟节点
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {//新建父节点
        //先把parent节点插在node节点前面
        dom.before(node, parent)
        //把node节点放入parent里面
        dom.append(parent, node)
    },
    //删
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node) {//childNodes的长度是随时变化的
        //const childNodes = node.childNodes;//等于const { childNodes } = node;
        const arr = [];
        // for (let i = 0; i < childNodes.length; i += 0) {
        //     dom.remove(childNodes[i])
        //     arr.push(childNodes[i])
        // }

        // let i = 0;
        // while (i < childNodes.length) {
        //     dom.remove(childNodes[i])
        //     arr.push(childNodes[i])
        // }

        let x = node.firstChild;
        while (x) {
            arr.push(dom.remove(node.firstChild))
            x = node.firstChild;//获取不到子节点就为null
        }
        return arr;
    },

    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            console.dir(node.getAttribute(name));
            return node.getAttribute;
        }
    },
    text(node, string) {
        if (arguments.length === 2) {
            'innerText' in node ? node.innerText = string : node.textContent = string;
        } else if (arguments.length === 1) {
            return 'innerText' in node ? node.innerText : node.textContent;
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {//typeof 会返回一个字符串 判断是什么数据类型或者函数
                return node.style[name]
            } else if (name instanceof Object) {//检测该对象的原型链是否有object
                for (let key in name) {//遍历数组
                    node.style[key] = name[key];
                }
            }
        }
    },

    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },

    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName.fn)
    },

    find(selector, scope) {//选择器
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {//获取父节点
        return node.parentNode;
    },
    children(node) {//获取子节点
        return node.children
    },
    siblings(node) {//获取兄弟节点
        return Array.from(node.parent.children).filter(n => n !== node)
    },
    next(node) {//获取弟弟
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x;
    },
    previous(node) {//获取哥哥
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x;
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {//获取排名
        const list = dom.children(node.parentNode)
        let i = 0;
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i;
    }
};