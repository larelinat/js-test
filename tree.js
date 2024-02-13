const data = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        }
    ]
}


class TreeNode {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.sorthead = data.sorthead;
        this.children = [];
    }

    addChild(child) {
        if (this.children.length === 0 || this.children[this.children.length - 1].sorthead <= child.sorthead) {
            this.children.push(child);
            return;
        }
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].sorthead > child.sorthead) {
                this.children.splice(i, 0, child);
                return;
            }
        }
    }

    printNode(depth) {
        console.log(' '.repeat(depth * 4) + this.name + (Number(this.price) !== 0.0 ? ' - ' + (this.price) : ''));
        this.children.forEach(child => {
            child.printNode(depth + 1);
        });
    }

    printNodeToHtml(depth, indentSize) {
        if (this.children.length === 0) {
            let div = document.createElement('div');
            div.style.paddingLeft = `${depth * indentSize}px`;
            div.textContent = `• ${this.name} (${this.price})`;
            return div;
        } else {
            let details = document.createElement('details');
            details.style.paddingLeft = `${depth * indentSize}px`;
            let summary = document.createElement('summary');
            summary.textContent = this.name;
            details.appendChild(summary);
            details.open = true;
            this.children.forEach(child => {
                details.appendChild(child.printNodeToHtml(depth + 1, indentSize));
            });
            return details;
        }
    }
}

class Tree {
    constructor(data) {
        this.root = null;
        this.nodes = {};
        this.buildTree(data);
    }

    buildTree(services) {
        services.forEach(service => {
            this.nodes[service.id] = new TreeNode(service);
        });

        services.forEach(service => {
            if (service.head === null) {
                this.root = this.nodes[service.id];
            } else {
                this.nodes[service.head].addChild(this.nodes[service.id]);
            }
        });
    }

    printTree() {
        this.root.printNode(0);
    }

    printTreeToHtml(indentSize) {
        let node = document.createElement('div');
        node.appendChild(this.root.printNodeToHtml(0, indentSize));
        return node;
    }
}

window.onload = () => {
    let tree = new Tree(data.services);
    tree.printTree();
    document.getElementById('app').appendChild(tree.printTreeToHtml(40));
}