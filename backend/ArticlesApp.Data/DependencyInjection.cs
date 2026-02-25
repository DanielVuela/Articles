using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ArticlesApp.Data
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddDataLayer(
      this IServiceCollection services,
      IConfiguration configuration)
    {
      services.AddDbContext<ArticlesDbContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
      );
      return services;
    }
  }
}
