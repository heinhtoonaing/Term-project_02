import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";
import { check, validationResult } from "express-validator";

// Middleware for file upload (express-fileupload)
import fileUpload from "express-fileupload";
app.use(fileUpload({ useTempFiles: true }));

// Post application
export const postApplication = [
  // Validation middleware using express-validator
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please provide a valid email").isEmail(),
  check("coverLetter", "Cover Letter is required").not().isEmpty(),
  check("phone", "Phone number is required").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
  check("jobId", "Job ID is required").not().isEmpty(),

  catchAsyncErrors(async (req, res, next) => {
    // Validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errors.array().map(err => err.msg).join(", "), 400));
    }

    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
    }

    // Check if resume is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Resume file required!", 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf", "application/msword"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(new ErrorHandler("Invalid file type. Please upload a PNG, JPEG, PDF, or DOC file.", 400));
    }

    // Upload resume to Cloudinary
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    // Ensure jobId is valid
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }

    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    // Create application
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  }),
];

// Get all applications for an employer
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers are not allowed to access this resource.", 400));
  }

  const { _id } = req.user;
  const applications = await Application.find({ "employerID.user": _id });

  res.status(200).json({
    success: true,
    applications,
  });
});

// Get all applications for a job seeker
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employers are not allowed to access this resource.", 400));
  }

  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id });

  res.status(200).json({
    success: true,
    applications,
  });
});

// Delete an application for a job seeker
export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employers are not allowed to access this resource.", 400));
  }

  const { id } = req.params;
  const application = await Application.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: "Application deleted successfully!",
  });
});
