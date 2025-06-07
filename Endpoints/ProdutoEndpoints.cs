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
            try
            {
                var produtos = await db.Produtos.Include(p => p.Categoria).ToListAsync();
                return Results.Ok(produtos);
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao buscar produtos: " + ex.Message);
            }
        });

        app.MapGet("/produtos/{id}", async (int id, AppDbContext db) =>
        {
            try
            {
                var produto = await db.Produtos.Include(p => p.Categoria)
                                               .FirstOrDefaultAsync(p => p.Id == id);
                return produto is not null ? Results.Ok(produto) : Results.NotFound();
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao buscar produto: " + ex.Message);
            }
        });

        app.MapPost("/produtos", async (Produto produto, AppDbContext db) =>
        {
            try
            {
                if (string.IsNullOrWhiteSpace(produto.Nome) || produto.Preco <= 0)
                {
                    return Results.BadRequest("Nome e preço do produto são obrigatórios e válidos.");
                }

                db.Produtos.Add(produto);
                await db.SaveChangesAsync();
                //return Results.Created($"/produtos/{produto.Id}", produto);
                await db.Entry(produto).Reference(p => p.Categoria).LoadAsync();
                return Results.Created($"/produtos/{produto.Id}", produto);
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao cadastrar produto: " + ex.Message);
            }
        });

        app.MapPut("/produtos/{id}", async (int id, Produto inputProduto, AppDbContext db) =>
        {
            try
            {
                var produto = await db.Produtos.FindAsync(id);
                if (produto is null) return Results.NotFound();

                if (string.IsNullOrWhiteSpace(inputProduto.Nome) || inputProduto.Preco <= 0)
                {
                    return Results.BadRequest("Nome e preço do produto são obrigatórios e válidos.");
                }

                produto.Nome = inputProduto.Nome;
                produto.Preco = inputProduto.Preco;
                produto.CategoriaId = inputProduto.CategoriaId;

                await db.SaveChangesAsync();
                return Results.Ok(produto);
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao atualizar produto: " + ex.Message);
            }
        });

        app.MapDelete("/produtos/{id}", async (int id, AppDbContext db) =>
        {
            try
            {
                var produto = await db.Produtos.FindAsync(id);
                if (produto is null) return Results.NotFound();

                db.Produtos.Remove(produto);
                await db.SaveChangesAsync();
                return Results.Ok(produto);
            }
            catch (Exception ex)
            {
                return Results.Problem("Erro ao deletar produto: " + ex.Message);
            }
        });
    }
}
