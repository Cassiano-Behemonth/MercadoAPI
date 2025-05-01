using System.ComponentModel.DataAnnotations;

using System.Text.Json.Serialization;

namespace MercadoAPI.Models;

public class Categoria
{
    public int Id { get; set; }

    [Required]
    public string? Nome { get; set; }

    [JsonIgnore]
    public ICollection<Produto>? Produtos { get; set; }
}
