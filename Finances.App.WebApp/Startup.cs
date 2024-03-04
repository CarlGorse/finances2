using Finances.App.WebApp.Interfaces.Services;
using Finances.App.WebApp.Services;
using Finances.Engine.Data;
using Finances.Engine.Data.Interfaces;
using Finances.Engine.Data.Models;
using Finances.Engine.Data.Models.Interfaces;
using Finances.Engine.Data.Repositories;
using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Factories;
using Finances.Engine.Interfaces.Dtos;
using Finances.Engine.Interfaces.Factories;
using Finances.Engine.Services;
using Finances.Engine.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;

namespace Finances.App.WebApp {

    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            services.AddControllersWithViews().AddRazorRuntimeCompilation();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appSettings.json")
                .Build();

            services.AddDbContext<FinancesDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("Finances")));

            services.AddScoped<IFinancesDbContext, FinancesDbContext>();

            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryGroupRepository, CategoryGroupRepository>();
            services.AddScoped<IReportTotalRepository, ReportTotalRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<ISearchCriteriaService, SearchCriteriaService>();

            services.AddScoped<IItemPropertiesFactory, ItemPropertiesFactory>();

            services.AddScoped<IItemProperties<Account>>(serviceProvider => {
                var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
                return factory.Get<Account>();
            });

            services.AddScoped<IItemProperties<Category>>(serviceProvider => {
                var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
                return factory.Get<Category>();
            });

            services.AddScoped<IItemProperties<CategoryGroup>>(serviceProvider => {
                var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
                return factory.Get<CategoryGroup>();
            });

            services.AddScoped<IItemProperties<Transaction>>(serviceProvider => {
                var factory = serviceProvider.GetRequiredService<IItemPropertiesFactory>();
                return factory.Get<Transaction>();
            });

            services.AddScoped(typeof(IEditableItemControllerService<>), typeof(EditableItemControllerService<>));
            
            services.AddScoped<IEditableItemRepository<Category>, CategoryRepository>();
            services.AddScoped<IEditableItemRepository<CategoryGroup>, CategoryGroupRepository>();
            services.AddScoped<IEditableItemRepository<Transaction>, TransactionRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            else {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Transactions}/{action=Index}"));

        }
    }
}
