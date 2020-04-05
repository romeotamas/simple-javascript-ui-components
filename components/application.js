
const Component = function () {

    this.domElem;

    this.randomId = () => {
        return parseInt(Math.round(Math.random() * 99999));
    };

    this.getDomElem = () => {
        return this.domElem;
    }
}

const Application = function (elemId) {

    let self = this;

    Component.call(self, {});

    this.addChild = (childElem, className) => {
        if (typeof childElem.getDomElem === "function") {
            let childDomElem = childElem.getDomElem();
            this.domElem.appendChild(childDomElem);
            childDomElem.classList.add(className);
        }
    };

    const init = () => {
        this.domElem = document.createElement("div");
        this.domElem.id = elemId;
        document.body.appendChild(this.domElem);
    };

    init();
}

const Form = function () {

    let self = this;

    Component.call(self, {});

    let fields = [];
    let domFields = [];
    let state = {};
    let submitBtn;

    this.setField = (name, type, value, fieldOptions = {}) => {
        fields = [...fields, { name, type, value, fieldOptions }];
    };


    this.setData = (data) => {
        state = data;

        createFields();
    }


    this.load = () => {

        createFields();

        defineEvents();
    };


    const defineEvents = () => {

        if (submitBtn) {

            this.domElem.addEventListener("submit", (evt) => {
                let frm = new FormData(this.domElem);
                let frmData = {};
                for (let p of frm.entries()) {
                    frmData[p[0]] = (!isNaN(p[1]) ? Number(p[1]) : p[1]);
                }

                console.log({ ...state, ...frmData });

                evt.preventDefault();
            });
        }

        domFields.forEach(domField => () => {


        });
    }


    const createHiddenFields = () => {

        let hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = "id";
        hiddenField.value = state["id"] ? state["id"] : "";
        this.domElem.querySelector(".form-fields").appendChild(hiddenField);
    };


    const createFields = () => {

        this.domElem.querySelector(".form-fields").innerHTML = "";
        domFields = [];

        createHiddenFields();

        fields.forEach(field => {

            let domFieldWrap = document.createElement("div");
            domFieldWrap.classList.add("form-field");

            if (["text", "email", "password"].indexOf(field.type) > -1) {
                let domField = document.createElement("input");
                domFields.push(domField);
                domField.type = field.type;
                domField.name = field.name;
                domField.value = state[field.name] ? state[field.name] : field.value;
                domFieldWrap.appendChild(domField);
            }

            this.domElem.querySelector(".form-fields").appendChild(domFieldWrap);
        });
    }

    const createActions = () => {

        let domActionWrap = document.createElement("div");
        domActionWrap.classList.add("form-actions");
        submitBtn = document.createElement("button");
        submitBtn.innerHTML = "Salveaza";
        submitBtn.type = "submit";
        domActionWrap.appendChild(submitBtn);
        this.domElem.appendChild(domActionWrap);
    };

    const init = () => {

        this.domElem = document.createElement("form");
        this.domElem.id = "formComponent_" + this.randomId();

        let fieldsWrap = document.createElement("div");
        fieldsWrap.classList.add("form-fields");
        this.domElem.appendChild(fieldsWrap);

        createActions();
    };

    init();
}

const Table = function () {

    let self = this;
    let columns = [];
    let state = [];

    let tableRows = [];
    let onSelectHandler = undefined;

    Component.call(self, {});

    this.addColumn = (colValue, colName, colOptions = {}) => {
        columns = [...columns, { name: colName, value: colValue }];
    }

    this.onSelect = handler => {
        onSelectHandler = handler;
    };

    this.setData = (data) => {
        state = data;
        createTableBody();
    };

    this.load = () => {

        createTableHeader();
        createTableBody();

        defineEvents();
    }

    const defineEvents = () => {

        tableRows.forEach((row, index) => {

            row.addEventListener("click", evt => {
                let target = evt.currentTarget;
                let idx = target.dataset["index"];
                if (onSelectHandler) {
                    onSelectHandler(state[idx]);
                }
            })
        });
    };

    const createTableHeader = () => {

        if (!columns.length) {
            columns = [{
                name: "Name",
                value: "name"
            }];
        }
        buildTableHeader(columns);
    }


    const createTableBody = () => {

        buildTableBody();
    }


    const buildTableBody = () => {

        let tableBody = this.domElem.querySelector("tbody");
        tableBody.innerHTML = "";
        state.forEach((stateItem, idx) => {
            let domTr = document.createElement("tr");
            domTr.dataset["index"] = idx;
            tableRows.push(domTr);

            columns.forEach(column => {
                let columnKeys = Object.keys(stateItem);
                let domTd = document.createElement("td");
                let domTdText = document.createTextNode("");
                if (columnKeys.indexOf(column.value) > -1) {
                    domTdText = document.createTextNode(stateItem[column.value]);
                }
                domTd.appendChild(domTdText);
                domTr.appendChild(domTd);
            });

            tableBody.appendChild(domTr);
        });
    };

    const buildTableHeader = () => {

        this.domElem.querySelector("thead").innerHTML = "";
        let domTr = document.createElement("tr");
        columns.forEach(column => {

            let domTh = document.createElement("th");
            let domThText = document.createTextNode(column.name);
            domTh.appendChild(domThText);
            domTr.appendChild(domTh);
        });
        this.domElem.querySelector("thead").appendChild(domTr);
    }

    const init = () => {
        this.domElem = document.createElement("table");
        this.domElem.id = "tableComponent_" + this.randomId();

        let domThead = document.createElement("thead");
        let domTbody = document.createElement("tbody");
        this.domElem.appendChild(domThead);
        this.domElem.appendChild(domTbody);
    };

    init();
}