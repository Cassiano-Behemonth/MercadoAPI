using MercadoAPI.Data;
using MercadoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MercadoAPI.Endpoints;

public static class CategoriaEndpoints
{
    public static void MapCategoriaEndpoints(this WebApplication app)
    {
        // Listar todas as categorias
        app.MapGet("/categorias", async (AppDbContext db) =>
        {
            return await db.Categorias.ToListAsync();
        });

        // Buscar categoria por ID
        app.MapGet("/categorias/{id}", async (int id, AppDbContext db) =>
        {
            var categoria = await db.Categorias.FindAsync(id);
            return categoria is not null ? Results.Ok(categoria) : Results.NotFound();
        });
    }
}
