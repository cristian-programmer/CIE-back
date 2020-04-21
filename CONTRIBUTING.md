# Flujo de trabajo en los repositorios de codigo fuente de GestionCIE

## Acerca de las ramas
La forma en como trabajamos para los repositorios de github es la siguiente:

- Todos los repositorios mantienen 3 ramas oficiales (Master,       
Developer, Produccion).
  - La rama Master contiene el codigo fuente que esta estable.
  - la rama Developer es aquella que esta en continuo cambios,         
    posibles errores de codigo, es donde se trabaja normalmente.
  - la rama Produccion es el codigo fuente puesto en ejecucion al   
    publico.

- Todos los pull request, errores y nuevas caracteristicas, deben hacerse sobre las ramas Developer solamente, los cambios en Master
y Produccion solo se realizan mediante merge seguros que pasen todas las pruebas.

- Aunque tenga la posiblidad de tener las branch de Master y Producción, no haga ningun cambio sobre ella, porque los cambios no seran recibidos, ni en su repositorio local haga un merge de Developer a alguna de las ramas ya mencionadas.

- Puede crear un rama basada en developer para arreglar un error, o agregar una nueva
caracteristica, luego de hacer el merge a Developer y enviar los cambios.


## Flujo en Git por primera vez

- Hacer un fork del repositorio que deseas de Gentem
- Hacer un git clone `url` del repositorio al cual le hizo el fork
- git add `files`,  añades los archivos modificados al staging, para hacer el commit
- git commit -m "mensaje en base a las modificaciones", realizas el commit
- git push origin `branch`, envias los cambios a tu repositorio de github
- desde github, envias el pull request.

## Flujo en Git
Al ser varios desarrolladores trabajando en conjunto, hay que saber que la rama developer estara con constantes cambios, enviaran muchos pull request, por esta razon se debe actualizar el repositorio local y el de github antes de enviar sus pulls request, sino no actualiza su repositorio antes de enviar sus cambios, el codigo que estaba en el repositorio base sera borrado, genera conflitos, se perderan commits, por eso es importante hacerlo.

- Hacer un git remote add upstream `url`, permite que se realize una 
  actualización del repositorio del cual hemos hecho el fork.
- git fetch upstream, traemos todas las ramas que haya en el proyecto base
- git checkout `branch` se mueve a la rama deseada (Master, Producción, Developer)
- git rebase upstream/`branch`, actualiza el repositorio local en la rama, con todos 
    los commits, del repositorio base.
- git push -f origin `branch`, envia los cambios a nuestro repositorio en github

estos pasos deben de hacerce antes de que escriba una sola linea de codigo y los añada al staging de git, luego de tener su repositorio actualizado, puede comenzar a trabajar

# Normas De Codigo Fuente

- Uso de el estandar EMAC5 + 
- Solo se hace uso de 1 clase por archivo
- Maximo de lineas de una clase es de 500 lineas
- Los metodos llevan nombres de verbos que tengan sentido
    ```js 
        move(){
            //code
        }

        createListPeoples(){
            //code
        }
    ```
- Nombres de variables con sentido
    ```js
        let cuentaAhorros = 0; (si)
        let ca = 0 ; (no)
    ```
    los nombres como i, j, k dentro de bucles for, while
    al ser conocidos por la comunidad de desarrolladores pueden seguirse usando

- despues de cada expresion debe agregar el punto y coma ";"
- para exportar clases o modulos se definen al final del archivo

    ```js
        class People{ /*code*/}
        module.export = {
            People:People
        }
    ```
- las clases deben usar CamelCase, los metodos y variables deben usar LowerCase
    ```js
        class Book{
            getListBooks(){
                let counterBooks = 0;
            }
        }

    ```