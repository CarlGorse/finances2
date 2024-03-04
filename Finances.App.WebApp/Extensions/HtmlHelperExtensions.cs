using Finances.Engine.Data.Models;
using Finances.Engine.Extensions.DataTypeExtensions;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.Linq;

namespace Finances.App.WebApp.Extensions {

    public static class HtmlHelperExtensions {

        public static IHtmlContent DropDownListYesNoFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            string id,
            int tabIndex = 0) {

            return HtmlHelperSelectExtensions.DropDownListFor(
                htmlHelper,
                expression,
                new (string Value, string Text)[] { ("true", "Yes"), ("false", "No") }
                .Select(i => new SelectListItem { Text = i.Text, Value = i.Value }),
                new { id, tabIndex });
        }

        public static IHtmlContent DropDownListYearsFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            string id,
            IReadOnlyCollection<int> selectableYears,
            int tabIndex = 0) {

            return HtmlHelperSelectExtensions.DropDownListFor(
                htmlHelper,
                expression,
                selectableYears.Select(x => new SelectListItem { Text = x.FormatXDigits(4), Value = x.ToString() }),
                new { id, tabIndex });
        }

        public static IHtmlContent DropDownListPeriodsFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            string id,
            int tabIndex = 0) {

            var selectablePeriods = Enumerable.Range(1, 12);

            return HtmlHelperSelectExtensions.DropDownListFor(
                htmlHelper,
                expression,
                selectablePeriods.Select(x => new SelectListItem { Text = x.FormatXDigits(2), Value = x.ToString() }),
                new { id, tabIndex });
        }

        public static IHtmlContent TextBoxFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            string id,
            int tabIndex = 0) {

            return HtmlHelperInputExtensions.TextBoxFor(
                htmlHelper,
                expression,
                new { id, tabIndex });
        }

        public static IHtmlContent DropDownListAccountsFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            IEnumerable<Account> accounts,
            string id,
            int tabIndex = 0) {

            return HtmlHelperSelectExtensions.DropDownListFor<TModel, TResult>(
                htmlHelper,
                expression,
                accounts
                    .Select(x => new SelectListItem { Text = x.Name, Value = x.AccountId.ToString() })
                    .OrderBy(x => x.Text),
                new { id, tabIndex }
            );
        }

        public static IHtmlContent DropDownListCategoriesFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            IEnumerable<Category> categories,
            string id,
            string additionalItemText = "",
            int tabIndex = 0) {

            var selectList = categories.Select(x => new SelectListItem { Text = x.NameWithGroup, Value = x.CategoryId.ToString() });
                   
            if (additionalItemText.Length > 0) {
                selectList = selectList.Union(new List<SelectListItem> { new SelectListItem { Text = additionalItemText, Value = 0.ToString() } });
            }

            selectList = selectList
                .OrderBy(x => x.Text != additionalItemText)
                .ThenBy(x => x.Text);

            return HtmlHelperSelectExtensions.DropDownListFor(
                htmlHelper,
                expression,
                selectList,
                new { id, tabIndex }
            );
        }

        public static IHtmlContent DropDownListCategoryGroupsFor<TModel, TResult>(
            this IHtmlHelper<TModel> htmlHelper,
            System.Linq.Expressions.Expression<System.Func<TModel, TResult>> expression,
            IEnumerable<CategoryGroup> categoryGroups,
            bool includeAllOption,
            string id,
            int tabIndex = 0) {

            var categoryGroupSelections = categoryGroups
                .Select(x => new SelectListItem { Text = x.Name, Value = x.CategoryGroupId.ToString() });

            var additionalItemText = "[all]";

            if (includeAllOption) {
                categoryGroupSelections = categoryGroupSelections
                    .Union(new List<SelectListItem> { new SelectListItem { Text = additionalItemText, Value = 0.ToString() } });
            }

            categoryGroupSelections = categoryGroupSelections
                .OrderBy(x => x.Text != additionalItemText)
                .ThenBy(x => x.Text);

            return HtmlHelperSelectExtensions.DropDownListFor(
                htmlHelper,
                expression,
                categoryGroupSelections,
                new { id, tabIndex }
            );
        }
    }
}
