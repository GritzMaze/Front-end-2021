# Домашно 3
Целта на домашното е да се създаде приложение за разглеждане на рецепти. В него ще се упражни HTML, CSS, JS DOM и използването на отдалечени услуги.

## Задача 1.
Използвайки приложените CSS променливи направете копие на примерите от изображенията.

	:root {
	    --color1: #FFFFFF;
	    --color2: #EAEAEA;
	    --color3: #C4C4C4;
	    --color4: #000000;
	    --fontsize1: 16px;
	    --fontsize2: 32px;
	    --borderradius1: 16px;
	    --borderradius2: 8px;
	    --spacing1: 16px;
	    --spacing2: 8px;
	    --opacity: 0.5;
	    --fontweight1: 700;
	    --fontweight2: 400;
    }

![enter image description here](https://i.postimg.cc/Kc9GHRDb/image.png)
![enter image description here](https://i.postimg.cc/dt11s8VD/image.png)

## Задача 2
Добавете нужните манипулации върху DOM структурата, за да може да се постигне резултата от второто изображение при натискането на кой да е **`See recipe`** бутон. **`Close`** бутона трябва да затваря отвореният диалог.

## Задача 3
Заредете нужните рецепти от отдалечения ресурс https://api.npoint.io/51ed846bdd74ff693d7e и визуализирайте всички рецепти, които се съдържат в него.

## Задача 4
Използвайки текстовите полета добавете възможност да се направи съответно търсене по име, регион и категория на ястието. Търсенето може да бъде комбинирано от трите филтъра

## Задача 5
Добавете нужните манипулации върху DOM структурата, за да може да се визуализира подробно рецептата на всяко ястие, както е показано във второто изображение.

## Бонус задача 6.1
Добавете опция за добавяне на нова рецепта към вашето приложение. (Използвайки firebase или localStorage)

## Бонус задача 6.2
Имплементирайте заданието ползвайки UI5 Web Components

Използвани импорти
```
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
```

![image](https://user-images.githubusercontent.com/5821279/147001599-7a757693-5dbf-40e8-8866-1748e1b50632.png)
![image](https://user-images.githubusercontent.com/5821279/147001642-eb6c2b4d-9ad2-4b7d-aad3-0a8c113a229b.png)

