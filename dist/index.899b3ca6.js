window.dom = {
    create (string) {
        //dom.create('<div><span>1</span></div>');
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after (node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    // fu.parentNode.appendChild(zi)
    },
    before (node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append (parent, node) {
        parent.appendChild(node);
    },
    wrap (node, parent) {
        //先把parent节点插在node节点前面
        dom.before(node, parent);
        //把node节点放入parent里面
        dom.append(parent, node);
    },
    //删
    remove (node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty (node) {
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
        while(x){
            arr.push(dom.remove(node.firstChild));
            x = node.firstChild; //获取不到子节点就为null
        }
        return arr;
    },
    attr (node, name, value) {
        if (arguments.length === 3) node.setAttribute(name, value);
        else if (arguments.length === 2) {
            console.dir(node.getAttribute(name));
            return node.getAttribute;
        }
    },
    text (node, string) {
        if (arguments.length === 2) 'innerText' in node ? node.innerText = string : node.textContent = string;
        else if (arguments.length === 1) return 'innerText' in node ? node.innerText : node.textContent;
    },
    html (node, string) {
        if (arguments.length === 2) node.innerHTML = string;
        else if (arguments.length === 1) return node.innerHTML;
    },
    style (node, name, value) {
        if (arguments.length === 3) node.style[name] = value;
        else if (arguments.length === 2) {
            if (typeof name === 'string') return node.style[name];
            else if (name instanceof Object) for(let key in name)node.style[key] = name[key];
        }
    },
    class: {
        add (node, className) {
            node.classList.add(className);
        },
        remove (node, className) {
            node.classList.remove(className);
        },
        has (node, className) {
            return node.classList.contains(className);
        }
    },
    on (node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off (node, eventName, fn) {
        node.removeEventListener(eventName.fn);
    },
    find (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent (node) {
        return node.parentNode;
    },
    children (node) {
        return node.children;
    },
    siblings (node) {
        return Array.from(node.parent.children).filter((n)=>n !== node
        );
    },
    next (node) {
        let x = node.nextSibling;
        while(x && x.nodeType === 3)x = x.nextSibling;
        return x;
    },
    previous (node) {
        let x = node.previousSibling;
        while(x && x.nodeType === 3)x = x.previousSibling;
        return x;
    },
    each (nodeList, fn) {
        for(let i = 0; i < nodeList.length; i++)fn.call(null, nodeList[i]);
    },
    index (node) {
        const list = dom.children(node.parentNode);
        let i = 0;
        for(i = 0; i < list.length; i++){
            if (list[i] === node) break;
        }
        return i;
    }
};

//# sourceMappingURL=index.899b3ca6.js.map
