import { Button } from "../ui/button";
import FormControls from "./form-controls";
import { motion } from "framer-motion";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  const formControlsVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        variants={formControlsVariants}
        initial="hidden"
        animate="visible"
      >
        <FormControls
          formControls={formControls}
          formData={formData}
          setFormData={setFormData}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Button 
          disabled={isButtonDisabled} 
          type="submit" 
          className="mt-6 w-full relative overflow-hidden group"
        >
          <span className="relative z-10">{buttonText || "Submit"}</span>
          <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </Button>
      </motion.div>
    </form>
  );
}

export default CommonForm;
