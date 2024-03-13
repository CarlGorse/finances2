using Finances.App.WebApp.Interfaces.Services;
using Finances.App.WebApp.Services;
using Finances.Engine.Data;
using Finances.Engine.Data.Interfaces;
using Finances.Engine.Data.Models;
using Finances.Engine.Data.Repositories;
using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Factories;
using Finances.Engine.Interfaces.Dtos;
using Finances.Engine.Interfaces.Factories;
using Finances.Engine.Services;
using Finances.Engine.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<ICategoryGroupRepository, CategoryGroupRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IFinancesDbContext, FinancesDbContext>();
builder.Services.AddScoped<IItemPropertiesFactory, ItemPropertiesFactory>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IReportTotalRepository, ReportTotalRepository>();
builder.Services.AddScoped<ISearchCriteriaService, SearchCriteriaService>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped(typeof(IEditableItemControllerService<>), typeof(EditableItemControllerService<>));
builder.Services.AddScoped<IEditableItemRepository<Category>, CategoryRepository>();
builder.Services.AddScoped<IEditableItemRepository<CategoryGroup>, CategoryGroupRepository>();
builder.Services.AddScoped<IEditableItemRepository<Transaction>, TransactionRepository>();

builder.Services.AddScoped<IItemProperties<Account>>(serviceProvider => {
    var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
    return factory.Get<Account>();
});

builder.Services.AddScoped<IItemProperties<Category>>(serviceProvider => {
    var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
    return factory.Get<Category>();
});

builder.Services.AddScoped<IItemProperties<CategoryGroup>>(serviceProvider => {
    var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
    return factory.Get<CategoryGroup>();
});

builder.Services.AddScoped<IItemProperties<Transaction>>(serviceProvider => {
    var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
    return factory.Get<Transaction>();
});

builder.Services.AddCors(options => {
    var policyName = "MyAllowedOrigins";
    options.AddPolicy(name: policyName,
                      builder => {
                          builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });
});

builder.Services.AddMvc().AddNewtonsoftJson(options => {
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
});

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appSettings.json")
    .Build();

builder.Services.AddDbContext<FinancesDbContext>(options =>
options.UseSqlServer(configuration.GetConnectionString("Finances")));

builder.Services.Configure<JsonSerializerSettings>(options => {
    //options.SerializerOptions.PropertyNameCaseInsensitive = false;
    options.ContractResolver = new DefaultContractResolver {
        NamingStrategy = new CamelCaseNamingStrategy()
    };
    //options.ReferenceLoopHandling = ReferenceLoopHa  ndling.Ignore;
});

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action}");

app.UseCors("MyAllowedOrigins");

app.UseAuthorization();

app.Run();
