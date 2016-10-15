       
## *Инструкция по сборке библиотеки DCMTK*
Для обеспечения сборки библиотеки DCMTK, на вашем компьютере должны быть установлены CMake(https://cmake.org/) и Conan(https://conan.io/). Клонируем репозиторий на компьютер. После этого запускаем командную строку и переходим в папку склонированного репозитория и вводим команды, указанные ниже.

     $ mkdir build.debug

     $ cd build.debug

     $ conan install ../src -s compiler="Visual Studio" -s compiler.version=14 -s arch=x86 -s build_type=Debug -s compiler.runtime=MDd

     $ cmake ../src -G "Visual Studio 14"

### *Примечание*
Команды написаны с учётом установленной на компьютере Visual Studio 14 32bit.
     
### *Комментарии к командам*

1. Создаем директорию с именем build.debug.
2. Переходим в эту директорию.
3. Conan встраивает библиотеку в выбранную среду разработки.
4. CMake делает сборку библиотеки.




