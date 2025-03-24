function getPriceRepair(repair) {
  let total_price = 0;
  repair.forEach((element) => {
    total_price +=
      element.estimatedprice * element.complexity * element.nbrepair;
  });
  return total_price;
}

function getPriceParts(parts) {
  let total_price = 0;
  parts.forEach((element) => {
    const quantity = element.quantite
    total_price += element.price * quantity;
  });
  return total_price;
}


function getTotalEstimatedHour(repair) {
  let total_minute = 0;
  repair.forEach((element) => {
    total_minute +=
      element.estimatedtime * element.complexity * element.nbrepair;
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

module.exports = {
  getPriceParts,
  getPriceRepair,
  getTotalEstimatedHour,
  checkMechanicsSkillsForMission,
};
