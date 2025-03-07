const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    // Get filter parameters from query string
    const { name, className, section, roll } = req.query;
    // Pass the filter parameters to the service
    const students = await getAllStudents({ name, className, section, roll });
    // Return the filtered students with the structure the frontend expects
    res.status(200).json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  // Extract student data from request body
  const studentData = req.body;
  // Call service to add new student
  const result = await addNewStudent(studentData);
  // Return success response
  res.status(201).json({ result });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  // Get student ID from URL params and combine with request body
  const studentData = {
    ...req.body,
    id: req.params.id,
  };
  // Call service to update student
  const result = await updateStudent(studentData);
  // Return success response
  res.status(200).json({ result });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  // Get student ID from URL params
  const studentId = req.params.id;
  // Call service to get student details
  const studentDetail = await getStudentDetail(studentId);
  // Return student details
  res.status(200).json({ studentDetail });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  // Create payload with user ID, reviewer ID, and status
  const payload = {
    userId: req.params.id,
    // Assuming reviewerId is available in the authenticated user's data
    reviewerId: req.user?.id,
    status: req.body.status,
  };
  // Call service to update student status
  const result = await setStudentStatus(payload);
  // Return success response
  res.status(200).json({ result });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
