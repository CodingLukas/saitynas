**T120B165 Saityno taikomųjų programų projektavimas**

## Projekto „Job Board“ ataskaita

Studentas: Lukas Zilinskas, IFF-0/11

Dėstytojai: Baltulionis Simonas

## Turinys

- 1. Sprendžiamo uždavinio aprašymas
   - 1.1. Sistemos paskirtis
   - 1.2. Aktoriai
   - 3.1. Funkciniai reikalavimai
- 2. Sistemos architektūra


## 1. Sprendžiamo uždavinio aprašymas

### 1.1. Sistemos paskirtis

Projekto tikslas – palengvinti skelbimų paiešką ir skelbimų talpinimą, centralizuojant
visus skelbimus vienoje platformoje.

Veikimo principas – platformą sudaro dvi dalys: internetinė aplikacija, kurią naudosis
skelbimų talpintojai, vartotojai, administratorius, bei aplikacijų programavimo sąsaja (API).

Talpintojas, norėdamas pateikti skelbimą, užsiregistruos platformoje, įkels skelbimo
informaciją, ir kontaktinius duomenis. Vartotojai galės peržiūrėti ir ieškoti skelbimų,
o administratorius valdys visus platformos aspektus, patikrinant skelbimus prieš patalpinant
juos viešai.

### 1.2. Aktoriai

Hierachinis ryšys kategorija<-skelbimas<-komentaras

1. Skelbimas
2. Kategorija – skelbimui galima priskirti kategoriją
3. Komentaras – skelbime galima rašyti komentarus

### 3.1. Funkciniai reikalavimai

Neregistruotas sistemos naudotojas galės:

1. Peržiūrėti skelbimų sąrašą.
2. Prisijungti prie internetinės aplikacijos.

Registruotas sistemos naudotojas galės:

1. Atsijungti nuo internetinės aplikacijos.
2. Pateikti naują skelbimą:

    2.1. Užpildyti skelbimo informaciją.
4. Redaguoti savo skelbimus.
5. Trinti savo skelbimus.
6. Peržiūrėti kitų talpintojų skelbimus.
7. Parašyti komentarą skelbime

Administratorius galės:

1. Patvirtinti naujus skelbimus.
2. Šalinti netinkamus skelbimus.
3. Valdyti kategorijų sąrašą.

    4.1. Trinti, sukurti, atnaujinti, peržiūrėti kategorijas

## 2. Sistemos architektūra


### Sistemos sudedamosios dalys:

- Kliento pusė (ang. Front-End) – naudojant React.js;
- Serverio pusė (angl. Back-End) – naudojant Express.js. Duomenų bazė – Firestore.

2.1 pav. pavaizduota kuriamos sistemos diegimo diagrama. Sistemos talpinimui naudojamas
Vercel serveris. Kiekviena sistemos dalis diegiama tame pačiame serveryje. Internetinė
aplikacija pasiekiama per HTTP protokolą. Sistemos veikimui (pvz., skelbimų talpinimui ar
paieškai) reikalingas "Adverts API", kuris pasiekiamas per aplikacijų programavimo sąsają.
Pats "Adverts API" vykdo duomenų mainus su Firestore duomenų baze.

![ScreenShot 2023-09-23-A3VSweUb@2x](https://github.com/CodingLukas/saitynas/assets/2143609/61490e60-71a7-40da-bcf5-5178d977ece4)
2.1 pav. Sistemos Job Boards diegimo diagrama

## 3. API Dokumentacija

1. Comments <https://documenter.getpostman.com/view/29987620/2s9YknAhpM>
2. Ads <https://documenter.getpostman.com/view/29987620/2s9YknAhpN>
3. Categories <https://documenter.getpostman.com/view/29987620/2s9YknAhpP>
4. Authentication <https://documenter.getpostman.com/view/29987620/2s9YRCVAr6>

## 4. Wireframe

We can find wireframe at:
 <https://www.figma.com/file/QhTpIj9iSKluNs9ry8lHaN/lukasimbm's-team-library?type=design&node-id=0-1&mode=design&t=nsDsbqeYtG9d2Kq1-0>

## 5. Summary

1. Centralized Job Posting and Searching: The system effectively centralized job postings, making it easier for users to find and apply for jobs. This streamlined approach significantly improved the job search experience.

2. User-Friendly Interface: The platform's interface, designed using jquery, proved to be user-friendly, allowing job posters to easily upload and manage their listings, and for job seekers to effortlessly browse and search for opportunities.

3. Effective User Management: The system enabled seamless user registration, login. It provided distinct functionalities for unregistered, registered users, and administrators, ensuring appropriate access and control across different user types.

4. Robust and Scalable Architecture: Utilizing Express.js for the back-end and Firestore for the database, the system demonstrated robust performance and scalability. This architecture supported a growing number of users and job listings without compromising speed or reliability.

5. Smooth Integration and Operation: The integration of different system components, such as the front-end, back-end, and database, was executed smoothly, leading to efficient system operation and user experience.

6. Well-Documented APIs: The APIs for comments, ads, categories, and authentication were well-documented, which facilitated easy integration and future updates. This documentation was crucial for maintaining and scaling the platform.

7. Effective Data Handling and Security: The APIs ensured secure and efficient handling of data, including job postings, user information, and interaction data. The use of JWT (JSON Web Tokens) for authentication significantly enhanced the platform's security.

8. Clear and Effective Design Blueprint: The wireframe provided on Figma served as an effective blueprint for the platform's design, ensuring that the final product was in line with the planned user experience and interface design.
