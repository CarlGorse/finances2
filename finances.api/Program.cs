using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Repositories;
using finances.api.Services;
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
builder.Services.AddScoped(typeof(IEditableItemControllerService<>), typeof(EditableItemControllerService<>));
builder.Services.AddScoped<IEditableItemRepository<Category>, CategoryRepository>();
builder.Services.AddScoped<IEditableItemRepository<CategoryGroup>, CategoryGroupRepository>();
builder.Services.AddScoped<IEditableItemRepository<Transaction>, TransactionRepository>();
builder.Services.AddScoped<IFinancesDbContext, FinancesDbContext>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IReportTotalRepository, ReportTotalRepository>();
builder.Services.AddScoped<ISearchCriteriaService, SearchCriteriaService>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionManagementService, TransactionManagementService>();

builder.Services.AddCors(options => {
    var policyName = "MyAllowedOrigins";
    options.AddPolicy(name: policyName,
                      builder => builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod());
});

builder.Services.AddMvc().AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appSettings.json")
    .Build();

builder.Services.AddDbContext<FinancesDbContext>(options =>
options.UseSqlServer(configuration.GetConnectionString("Finances")));

builder.Services.Configure<JsonSerializerSettings>(options => options.ContractResolver = new DefaultContractResolver {
    NamingStrategy = new CamelCaseNamingStrategy()
});

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action}");

app.UseCors("MyAllowedOrigins");

app.UseAuthorization();

app.Run();
