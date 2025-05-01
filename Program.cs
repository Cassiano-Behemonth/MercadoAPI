using MercadoAPI.Data;
using Microsoft.EntityFrameworkCore;
using MercadoAPI.Endpoints;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=mercado.db"));

var app = builder.Build();

app.MapGet("/", () => "API de Estoque de Mercado - funcionando!");

app.MapCategoriaEndpoints();

app.MapProdutoEndpoints();

app.Run();