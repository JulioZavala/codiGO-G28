import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  getCustomerService,
  updateCustomerService,
} from "@/services/authService";

// ESQUEMA ZOD (No validamos email/username porque no se envían)
const customerSchema = z.object({
  first_names: z.string().min(2, "Mínimo 2 caracteres"),
  paternal_last_name: z.string().min(2, "Mínimo 2 caracteres"),
  maternal_last_name: z.string().optional(),
  document_type: z.enum(["DNI", "RUC", "CE", "PAS"]),
  document_number: z.string().min(8, "Número inválido"),
  phone_number: z.string().min(9, "Teléfono inválido"),
  birth_date: z.string().optional(),
});

const Customer = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(customerSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    // 1. Efecto de carga al montar el componente
    const fetchCustomerData = async () => {
      try {
        const customer = await getCustomerService();
        // 2. Aquí es donde llenamos los campos con reset()
        reset(customer);
      } catch (error) {
        console.error("No se pudo cargar el perfil del cliente", error);
      } finally {
        setIsInitializing(false);
      }
    };
    fetchCustomerData();
  }, [reset]); // Solo se ejecuta UNA VEZ cuando entras a "Mi Cuenta"

  const isEmailVerified = watch("is_email_verified");

  // //Valores por defecto simulados (esto vendría de tu backend)
  // const defaultValues = {
  //   username: customer?.username || "",
  //   email: customer?.email || "",
  //   is_email_verified: false, // Cambia esto para probar el check verde
  //   first_names: customer?.first_names || "",
  //   paternal_last_name: customer?.paternal_last_name || "",
  //   maternal_last_name: customer?.maternal_last_name || "",
  //   document_type: customer?.document_tupe || "DNI",
  //   document_number: customer?.document_number || "",
  //   phone_number: customer?.phone_number || "",
  //   birth_date: customer?.birth_date || "",
  // };

  if (isInitializing) return <p>Cargando datos...</p>;

  const onSubmit = async (data) => {
    try {
      await updateCustomerService(data);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
      {/* Título de la sección */}
      <header className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[#0F2D51] border-b border-gray-100 pb-4">
          Información Personal
        </h2>
        <p className="text-[10px] text-[#B0B7BF] uppercase tracking-widest mt-2">
          Gestiona tus datos personales y de contacto.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* BLOQUE 1: DATOS DE CUENTA (NO EDITABLES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Username
            </label>
            <input
              {...register("username")}
              disabled
              className="w-full border-b border-gray-200 py-2 text-sm bg-transparent text-gray-500 cursor-not-allowed outline-none"
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Email
              </label>

              {/* Lógica de Verificación */}
              {isEmailVerified ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 tracking-wider uppercase">
                  <CheckCircle2 size={12} /> Verificado
                </span>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-1 text-[10px] font-bold text-amber-600 tracking-wider uppercase hover:underline"
                >
                  <AlertCircle size={12} /> Enviar verificación
                </button>
              )}
            </div>
            <input
              {...register("email")}
              disabled
              className="w-full border-b border-gray-200 py-2 text-sm bg-transparent text-gray-500 cursor-not-allowed outline-none"
            />
          </div>
        </div>

        {/* BLOQUE 2: DATOS PERSONALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
              Nombres *
            </label>
            <input
              {...register("first_names")}
              className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
            />
            {errors.first_names && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.first_names.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
                Ap. Paterno *
              </label>
              <input
                {...register("paternal_last_name")}
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
              />
              {errors.paternal_last_name && (
                <span className="text-red-500 text-[10px] mt-1 block">
                  {errors.paternal_last_name.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
                Ap. Materno
              </label>
              <input
                {...register("maternal_last_name")}
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* DOCUMENTO: Grid anidado para Select + Input */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
                Tipo *
              </label>
              <select
                {...register("document_type")}
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent appearance-none rounded-none cursor-pointer"
              >
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="PAS">PAS</option>
                <option value="RUC">RUC</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
                N° Documento *
              </label>
              <input
                {...register("document_number")}
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
              />
              {errors.document_number && (
                <span className="text-red-500 text-[10px] mt-1 block">
                  {errors.document_number.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
              Teléfono *
            </label>
            <input
              {...register("phone_number")}
              type="tel"
              className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
            />
            {errors.phone_number && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.phone_number.message}
              </span>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600">
              Fecha de Nacimiento
            </label>
            <input
              {...register("birth_date")}
              type="date"
              className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors text-gray-700 bg-transparent uppercase"
            />
          </div>
        </div>

        {/* BOTÓN SUBMIT */}
        <div className="pt-6">
          <button
            disabled={!isDirty || isSubmitting}
            className="bg-[#1a1a1a] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Customer;
