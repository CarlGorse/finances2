using Finances.App.WebApp.Interfaces.Services;
using Finances.Engine.Data.Models.Interfaces;
using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Interfaces.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Finances.App.WebApp.Services {

    public class EditableItemControllerService<T> : IEditableItemControllerService<T> where T: class, IEditableItem<T> {

        private readonly IEditableItemRepository<T> _EditableItemRepository;
        private readonly IItemProperties<T> _ItemProperties;

        public EditableItemControllerService(
            IItemProperties<T> itemProperties,
            IEditableItemRepository<T> editableItemRepository) {

            _ItemProperties = itemProperties;
            _EditableItemRepository = editableItemRepository;
        }

        public IStatusCodeActionResult Get(IEnumerable<int> ids) {

            var items = _EditableItemRepository.Get(ids);

            if (!items.Any()) {
                
                var value = JsonSerializer.Serialize(new { 
                        ids, 
                        validationErrors = new List<string> { $"Unknown {_ItemProperties.DescriptionSingle}" } 
                    }
                );

                return new ObjectResult(value) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }
            
            return new OkObjectResult(new { items });
        }

        public IStatusCodeActionResult Add(T item) {

            var result = _EditableItemRepository.Add(item, out var validationErrors, saveChanges: true);

            if (!result) {
                var value = JsonSerializer.Serialize(new { item, validationErrors });
                return new ObjectResult(value) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }

            return new OkObjectResult(item.Id);
        }

        public IStatusCodeActionResult Edit(T item) {

            var updatedItem = _EditableItemRepository.Edit(item, out var validationErrors);

            if (validationErrors.Any()) {
                var value = JsonSerializer.Serialize(new { item, validationErrors });
                return new ObjectResult(value) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }

            return new OkObjectResult(new { item = updatedItem });
        }

        public IStatusCodeActionResult Delete(IEnumerable<int> ids) {

            var result = _EditableItemRepository.Delete(ids, out var validationErrors);

            if (!result) {
                var value = JsonSerializer.Serialize(new { ids, validationErrors });
                return new ObjectResult(value) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            };

            return new OkObjectResult(new { ids });
        }
    }
}
