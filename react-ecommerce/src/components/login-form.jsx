import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/hooks/use-login-form";

export function LoginForm({ className, ...props }) {
  const { values, handleInputChange, handleSubmit } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Ingresa con tu cuenta</CardTitle>
          <CardDescription>
            Introduce tu correo electrónico a continuación para iniciar sesión
            en tu cuenta.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>
                <Input
                  id="password"
                  value={values.password}
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Iniciar Sesión</Button>
                <FieldDescription className="text-center">
                  No tienes una cuenta? <a href="#">Registrate</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}