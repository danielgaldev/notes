# Webalkalmazás fejlesztése React keretrendszerrel
### Gál Dániel
### BME VIK mérnökinformatikus BSc, önálló laboratórium dokumentáció

## Motiváció
Minden aktív jogviszonyos hallgatónak van valamilyen módja arra, hogy a felvett tárgyak teljesítéséhez szükséges feladait valamilyen rendszerben tartsa. Ez a rendszer általában egy online táblázat, online vagy papír alapú határidőnapló.

Az én megoldásom ugyanezt a feladatot fogja ellátni, emellett könnyen karbantartható lesz, és egyszerűen kiegészíthető új feature-ökkel.

## Specifikáció

A felhasználó képes lesz az alkalmazásban:
* Felvenni féléveket
* A féléveken belül felvenni tárgyakat
* A tárgyakhoz követelményeket felvenni
* A követelményeket teljesítettként jelölni

## Technológiák

### Frontend
A témához ragaszkodva az alkalmazás frontendje React alapú. Az ehhez szorosan kapcsolódó Redux segítségével az állapotot centralizáltan tudom kezelni, és minden komponens csak a számára szükséges adatokból gazdálkodik amellett, hogy egyébként hozzáfér az állapot minden adatához. A UI szépségéért a Semantic UI React csomag felel.

### Backend
Mivel nem találtam az igényeimhez igazodó publikus REST API-t, a feladatom kibővült azzal, hogy ezt is saját magam készítem el. Ezt Django-ban, pontosabban a Django REST framework-öt használva valósítottam meg. A félévekhez, tárgyakhoz és követelményekhez egyaránt viszonylag kevés kóddal rendelkezésemre bocsátottam a CRUD funkcionalitást. Az authentikációhoz a Django beépített osztályait használtam.

A backend-emhez egy komolyabb adatbázist is társítottam (PostgreSQL), hogy egy kicsit közelebb vigyem a környezetet egy valós production környezethez.

### Ami ezeket összekapcsolja
Célom volt továbbá, hogy mind az alkalmazásom, mind a fejlesztőkörnyezete hordozható legyen, ezért Docker konténerekbe csomagoltam. Ennek legnagyobb előnye az, hogy bárki bárhol kipróbálhatja és fejlesztheti az alkalmazásomat, platformtól függetlenül.
Legelső futtatáskor ki kell adni a `docker volume create --name semestr-db` parancsot, hogy az adatok a host gépre kerüljenek.

Ezek után a környezet egy paranccsal indítható:
```
docker-compose up
```
Három konténer indul el:
* **backend**: tartalmazza a Django REST API-t ami a http://localhost:8000-es porton várja a kéréseket.
* **frontend**: a React alkalmazás, amit a böngészőben megnyithatunk, ha a http://localhost:3000 címre navigálunk.
* **db**: egy egyszerű PostgreSQL konténer, amit a backend konténer (és azon belül a Django) menedzsel.

## Demo

Mivel az alkalmazás backend-jét is saját magam készítettem el, a végleges megoldás néhány eleme nem kapott szerepet (pl. tárgyak, követelmények).

### Ami megvalósult

#### Backend
A CRUD operációk működőképesek félévekre, tárgyakra és követelményekre is.

#### Frontend
A felhasználót egy bejelentkező képernyő fogadja.

![login](https://user-images.githubusercontent.com/30264881/58354460-d2875700-7e71-11e9-810b-36e5db008ce2.png)

Lehetősége van a felhasználónevével és a jelszavával belépni, valamint ha még nem regisztrált az oldalra, a "Register" linkre kattintva az alkalmazás átirányítja őt a regisztrációs oldalra.

![register](https://user-images.githubusercontent.com/30264881/58354595-3d389280-7e72-11e9-8e53-9c26b4f15b25.png)

Ezen az oldalon egy választhatunk felhasználónevet és jelszót magunknak. A sikeres regisztráció megtörténtekor visszakerülünk a bejelentkezési képernyőre.

Ha új felhasználóként belépünk, az alábbi látvány fogad minket:

![logged_in](https://user-images.githubusercontent.com/30264881/58354701-8852a580-7e72-11e9-933b-4f4187ee07fd.png)

Fent középen látható a bejelentkezett felhasználó neve, jobb oldalt egy kijelentkezés gomb, valamint egy félév hozzáadó gomb. Erre kattintva egy felugró ablakban megadhatjuk a felvenni kívánt félév számát.

![add_semester](https://user-images.githubusercontent.com/30264881/58354916-1595fa00-7e73-11e9-9cd6-412dea29208f.png)

A hozzáadott félév ezek után megjelenik a főképernyőn. Ha többet is hozzáadunk, ezek (frissítés után mindenképpen) növekvő sorrendbe rendezve várják a további parancsainkat.

![semesters](https://user-images.githubusercontent.com/30264881/58355086-8ccb8e00-7e73-11e9-990a-d54554d702f5.png)

Féléveket a hozzájuk tartozó cella jobb szélében található, kukáva jelzett gombbal törölhetjük.

A frontenden történő adatmódosításokhoz tartozó kérések megjelennek a backend konténer kimenetén, ebből látható, hogy az adatbázisba írás, abból kiolvasás és továbbítás a React alkalmazásba megfelelően működik.

## Tervek

A következő lépés mindenképpen a tárgyak, követelmények hozzáadása, és az ezekhez tartozó műveletek implementálása a frontend-en. Ezek után bonyolultabb üzleti logika megvalósítására törekednék a backend-en, mint például egy admin jogokkal rendelkező felhasználó által létrehozott mintatanterv importálása, és annak módosítási lehetősége.

Hosszú távú céljaim között van az is, hogy a webalkalmazás host-olható legyen a saját Docker-es formájában.