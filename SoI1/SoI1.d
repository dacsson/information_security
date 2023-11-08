import std.stdio;
import std.math;
import std.algorithm;

double get_distance(double x1, double y1, double x2, double y2)
{
    return sqrt(
        pow(x2 - x1, 2) + pow(y2 - y1, 2)
    );
}

int var_input(string msg, int left, int right)
{
    writeln(msg, " | > ", left, " и < ", right, ": ");
    int var; scanf("%i", &var);
    while(var <= left || var >= right) scanf("%i", &var);
    return var;
}

double var_input(string msg, double left, double right)
{
    writeln(msg, " | > ", left, " и < ", right, ": ");
    double var; scanf("%lf", &var);
    while(var <= left || var >= right) scanf("%lf", &var);
    return var;
}

void main()
{
    int x_from_fence = var_input("X забора", 0, 50);
    int y_from_fence = var_input("Y забора", 0, 50);
    int x_first_window = var_input("X первого окна", 0, x_from_fence);
    int x_second_window = var_input("X второго окна", 0, x_from_fence);
    int y_windows = var_input("Y окон", 0, y_from_fence);
    int x_disk = var_input("X носителя информации", 0, x_from_fence);
    int y_disk = var_input("Y носителя информации", 0, y_from_fence);
    double p_breaking_first_window = var_input("Вероятность проникновения в первое окно", 0.0, 1.0);
    double p_breaking_second_window = var_input("Вероятность проникновения во второе окно", 0.0, 1.0);

    double k1 = 2;
    double k2 = 0.5;

    double[] array1, array2;
    double distance_first = get_distance(x_first_window, y_windows, x_disk, y_disk);
    double distance_second = get_distance(x_second_window, y_windows, x_disk, y_disk);

    for(double x = 0; x < x_from_fence; x += x_from_fence / 100.0)
    {
        double distance_first_window = get_distance(x, y_from_fence, x_first_window, y_windows);
        double distance_second_window = get_distance(x, y_from_fence, x_second_window, y_windows);
        double p1 = (k1 / distance_first_window) * p_breaking_first_window * (k2 / distance_first);
        double p2 = (k1 / distance_second_window) * p_breaking_second_window * (k2 / distance_second);

        array1 ~= p1;
        array2 ~= p2;
    }

    for(int i = 0; i < array1.length; i++) writeln(i+1, "\nP1: ", array1[i], "\nP2: ", array2[i]);

    writeln("\nМин. вероятность для окна 1: ", minElement(array1), "\nМин. вероятность для окна 2: ", minElement(array2));
    if(minElement(array1) > minElement(array2)) writeln("\n!Необходимое окно - 2");
    else writeln("\n!Необходимое окно: 1");
}