using ArticlesApp.Models.Entites;
using ArticlesApp.Domain.Services;
using System.Text.Json;

namespace ArticlesApp.Data.Services
{
  public class SourceItemService : ISourceItemService
  {
    private readonly ArticlesDbContext _db;

    public SourceItemService(ArticlesDbContext db)
    {
      _db = db;
    }

    public async Task<int> CreateAsync(JsonElement payload, CancellationToken ct = default)
    {
      var rawJson = payload.ToString();
      var item = new SourceItem
      {
        Json = rawJson,              
        CreatedAt = DateTime.UtcNow,
        SourceId = 1 // TODO : Actually use a source.
      };
      _db.SourceItems.Add(item);
      await _db.SaveChangesAsync(ct);
      return item.Id;
    }
  }
}
