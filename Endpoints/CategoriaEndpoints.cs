using MercadoAPI.Data;
using MercadoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MercadoAPI.Endpoints;

public static class CategoriaEndpoints
{
    public static void MapCategoriaEndpoints(this WebApplication app)
    {
        app.MapGet("/categorias", async (AppDbContext db) =>
        {
            try
            {
                var categorias = await db.Categorias.ToListAsync();
                return Results.Ok(categorias);
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao buscar categorias: " + ex.Message);
            }
        });

        app.MapGet("/categorias/{id}", async (int id, AppDbContext db) =>
        {
            try
            {
                var categoria = await db.Categorias.FindAsync(id);
                return categoria is not null ? Results.Ok(categoria) : Results.NotFound();
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao buscar categoria: " + ex.Message);
            }
        });

        // (Opcional) Adicionando um POST com validação
        app.MapPost("/categorias", async (Categoria categoria, AppDbContext db) =>
        {
            try
            {
                if (string.IsNullOrWhiteSpace(categoria.Nome))
                {
                    return Results.BadRequest("O nome da categoria é obrigatório.");
                }

                db.Categorias.Add(categoria);
                await db.SaveChangesAsync();
                return Results.Created($"/categorias/{categoria.Id}", categoria);
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao cadastrar categoria: " + ex.Message);
            }
        });
    }
}
