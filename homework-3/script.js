import "https://unpkg.com/@ui5/webcomponents-fiori@1.0.2/dist/ShellBar.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Panel.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Input.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/List.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Dialog.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/CustomListItem.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/StandardListItem.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Table.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableColumn.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableRow.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableCell.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/hint.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Avatar.js?module";



	var dialogOpener = document.getElementById("myList");
	var dialog = document.getElementById("hello-dialog");
	var dialogCloser = document.getElementById("closeDialogButton");

	dialogOpener.addEventListener("click", (event) => {
        const element = event.target;
		dialog.show();
	});

	dialogCloser.addEventListener("click", () => {
		dialog.close();
	});