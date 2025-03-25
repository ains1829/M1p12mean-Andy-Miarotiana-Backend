function getPriceRepair(repair) {
  let total_price = 0;
  const complexity = 1;
  repair.forEach((element) => {
    total_price +=
      element.estimatedprice * complexity * element.quantite_service;
  });
  return total_price;
}

function getPriceParts(parts) {
  let total_price = 0;
  parts.forEach((element) => {
    total_price += element.price * element.quantite_devis;
  });
  return total_price;
}

function getTotalEstimatedHour(repair) {
  let total_minute = 0;
  const complexity = 1;
  repair.forEach((element) => {
    total_minute +=
      element.estimatedtime * complexity * element.quantite_service;
  });
  return total_minute;
}

function checkMechanicsSkillsForMission(mecano, repair_category) {
  const allSkills = mecano.flatMap((mecano) => mecano.skills);
  const canCoverCategories = repair_category.every((category) =>
    allSkills.includes(category)
  );
  return canCoverCategories;
}
async function findDocumentById(model, id, errorMessage) {
  const document = await model.findById(id);
  if (!document) throw new Error(errorMessage);
  return document;
}

async function findDocumentsByIds(model, ids, errorMessage) {
  const documents = await model.find({ _id: { $in: ids } });
  if (documents.length !== ids.length) throw new Error(errorMessage);
  return documents;
}

function extractIds(items, key) {
  return items.map((item) => item[key].toString());
}

function calculateTotalPrice(repairSubcategories, parts) {
  return getPriceRepair(repairSubcategories) + getPriceParts(parts);
}
module.exports = {
  getTotalEstimatedHour,
  checkMechanicsSkillsForMission,
  findDocumentById,
  findDocumentsByIds,
  extractIds,
  calculateTotalPrice,
};
