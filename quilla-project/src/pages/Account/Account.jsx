import useUserStore from "@/stores/useUserStore";

const Account = () => {
  const { user } = useUserStore();

  return (
    <div className="border ">
      <div className="pt-40 bg-stone-600"></div>
      <div className="account__info">
        <h2 className="text-4xl m-10">{
            user
              ? `Perfil de ${user.firstname} ${user.lastname}` // Si hay usuario
              : "Usuario no logeado" // Si no hay usuario
          }</h2>
      </div>
    </div>
  );
};

export default Account;