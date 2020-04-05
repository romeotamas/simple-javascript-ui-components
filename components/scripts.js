

document.addEventListener("DOMContentLoaded", () => {

    const app = new Application("rootApp");


    const form = new Form();
    form.setField("name", "text", "");
    form.setField("price", "text", "");
    form.load();
    form.onSave(frmData => {
        console.log(frmData);
    });


    const table = new Table();
    table.addColumn("id", "Id");
    table.addColumn("name", "Name");
    table.addColumn("price", "Price");
    table.onSelect(item => {
        form.setData(item);
    });
    table.setData([
        { id: 1, name: "Produs 1", value: 1, price: 32.82 },
        { id: 2, name: "Produs 2", value: 2, anotherPrice: 12.23 },
        { id: 3, name: "Produs 3", value: 3, price: 15.12 }
    ]);
    table.load();


    app.addChild(form, "appForm");
    app.addChild(table, "appTable");
});