using ArticlesApp.Data;
using ArticlesApp.Domain.Services;
using ArticlesApp.Models.Entites;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDataLayer(builder.Configuration);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
  options.AddPolicy("frontend", policy =>
      policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("frontend");

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

#region Source Items

app.MapPost("/source-items", async (JsonElement payload, ISourceItemService service, CancellationToken ct) =>
{
  var id = await service.CreateAsync(payload, ct);
  return Results.Created($"/source-items/{id}", new { id, message = "Stored" });
})
.WithName("CreateSourceItem");

#endregion

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
