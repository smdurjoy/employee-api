const { Employee } = require("../models");

async function getEmployeeHierarchy(employeeId) {
  const employee = await Employee.findOne({
    where: { id: employeeId },
    include: {
      model: Employee,
      as: 'children',
      hierarchy: true,
    },
  });

  if (!employee) return null;

  return {
    id: employee.id,
    name: employee.name,
    positionId: employee.positionId,
    positionName: employee.positionName,
    child: employee.children.length
      ? await Promise.all(employee.children.map(child => getEmployeeHierarchy(child.id)))
      : null,
  };
}

// Controller to fetch hierarchy by employee ID
exports.getHierarchy = async (req, res) => {
  const { id } = req.params;
  try {
    const hierarchy = await getEmployeeHierarchy(id);
    res.json(hierarchy);
  } catch (error) {
    console.log({error})
    res.status(500).json({ error: 'Error fetching employee hierarchy' });
  }
};