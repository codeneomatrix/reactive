import rx;
import std.algorithm : equal;
import std.array : appender;
import std.conv : to;
import std.stdio;
void main()
{
    auto subject = new SubjectObject!int;
    auto pub = subject
        .filter!(n => n % 2 == 0)
        .map!(o => to!string(o));

    auto buf = appender!(string[]);
    auto disposable = pub.subscribe(buf);

    foreach (i; 0 .. 10)
    {
        subject.put(i); //se modifica el sujeto
        write("nuevo valor del sujeto: ");
        writeln(i);
    }

    auto result = buf.data;
    write("\nresultado:");
    writeln(result);
    //assert(equal(result, ["0", "2", "4", "6", "8"])); //se verifica que la salida sea la esperada
}
