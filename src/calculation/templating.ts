import {
  ProductDataComponent,
  ProductDataComponentPartial,
  ProductData,
  ProductDataPartial,
  ProductDataTemplate,
} from "../model/types";

export function expandProductDataPartialWithTemplate(
  partial: ProductDataPartial,
  template: ProductDataTemplate
): ProductData {
  let dataFromTemplate: ProductData = {
    ...template,
  };

  // Removing the template's specific fields (id, label...) before expanding into the result.
  delete (dataFromTemplate as any).id;
  delete (dataFromTemplate as any).label;
  delete (dataFromTemplate as any).source;

  // Deleting blank values from the partial so that they get expanded.
  if (!partial.weight || partial.weight === NaN) delete partial.weight;

  // Completing the components from entry as it has some.
  let result: ProductData = {
    ...dataFromTemplate,
    ...partial,
    components: expandComponentFromTemplate(
      partial.components,
      template.components
    ),
  };

  // TECHNICAL-DEBT: templating is not correctly applied here (no impact yet)
  //   because "blank" values (e.g. "", undefined) will not be expanded with the
  //   template's. Only weight has been fixed.
  return result;
}

function expandComponentFromTemplate(
  entryComponents: ProductDataComponentPartial[] | undefined,
  templateComponents: ProductDataComponent[]
): ProductDataComponent[] {
  const resultComponents: ProductDataComponent[] = [];
  for (let templateComp of templateComponents) {
    if (!entryComponents) {
      resultComponents.push(templateComp);
    } else if (entryComponents) {
      const matchingComp = entryComponents.find(
        (c) => c.componentId === templateComp.componentId
      );
      if (!matchingComp) {
        // If the templateComponent is missing (based on its id) from
        // components, add it.
        resultComponents.push(templateComp);
      } else {
        // If it's present, expand it into the matching component so that
        // any missing value is added.
        const resultComp = { ...templateComp };

        // Merging non-blank fields
        if (matchingComp.materialId)
          resultComp.materialId = matchingComp.materialId;
        if (
          matchingComp.materialSourceUrls &&
          matchingComp.materialSourceUrls.length > 0
        )
          resultComp.materialSourceUrls = matchingComp.materialSourceUrls;
        if (matchingComp.proportion)
          resultComp.proportion = matchingComp.proportion;
        if (
          matchingComp.proportionSourceUrls &&
          matchingComp.proportionSourceUrls.length > 0
        )
          resultComp.proportionSourceUrls = matchingComp.proportionSourceUrls;

        resultComponents.push(resultComp);
      }
    }
  }
  return resultComponents;
}
