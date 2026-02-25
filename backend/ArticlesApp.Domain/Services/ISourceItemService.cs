using System.Text.Json;

namespace ArticlesApp.Domain.Services
{
  public interface ISourceItemService
  {
    Task<int> CreateAsync(JsonElement payload, CancellationToken ct = default);

  }
}
