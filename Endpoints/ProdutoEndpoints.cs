using MercadoAPI.Data;
using MercadoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MercadoAPI.Endpoints;

public static class ProdutoEndpoints
{
    public static void MapProdutoEndpoints(this WebApplication app)
    {

        app.MapGet("/produtos", async (AppDbContext db) =>
        {
            var produtos = await db.Produtos.Include(p => p.Categoria).ToListAsync();
            return Results.Ok(produtos);
        });

        app.MapGet("/produtos/{id}", async (int id, AppDbContext db) =>
        {
            var produto = await db.Produtos.Include(p => p.Categoria)
                                           .FirstOrDefaultAsync(p => p.Id == id);
            return produto is not null ? Results.Ok(produto) : Results.NotFound();
        });

        app.MapPost("/produtos", async (Produto produto, AppDbContext db) =>
        {
            db.Produtos.Add(produto);
            await db.SaveChangesAsync();
            return Results.Created($"/produtos/{produto.Id}", produto);
        });

        app.MapPut("/produtos/{id}", async (int id, Produto inputProduto, AppDbContext db) =>
        {
            var produto = await db.Produtos.FindAsync(id);
            if (produto is null) return Results.NotFound();

            produto.Nome = inputProduto.Nome;
            produto.Preco = inputProduto.Preco;
            produto.CategoriaId = inputProduto.CategoriaId;

            await db.SaveChangesAsync();
            return Results.Ok(produto);
        });

        app.MapDelete("/produtos/{id}", async (int id, AppDbContext db) =>
        {
            var produto = await db.Produtos.FindAsync(id);
            if (produto is null) return Results.NotFound();

            db.Produtos.Remove(produto);
            await db.SaveChangesAsync();
            return Results.Ok(produto);
        });
    }
}