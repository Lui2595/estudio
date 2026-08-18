/**
 * TEMA: Enums (enumerados)
 * ENTREVISTA: ¿Por qué muchos equipos evitan enums en TypeScript?
 *
 * En TypeScript, los enums crean código JavaScript adicional en tiempo de ejecución, lo que puede sorprender
 *  (por ejemplo, tienen comportamiento "bidireccional" en numéricos y no son simples sustituciones 
 * en tiempo de compilación como los union types). Esto puede causar bugs y hace el código más
 *  difícil de entender/debuggear, especialmente al integrarse con APIs modernas y frameworks como
 *  React o herramientas tipo Laravel, donde se prefieren las soluciones que no generan efectos en runtime.

 * Por eso, se recomienda en muchos equipos usar union types y objetos constantes en lugar de enums, porque:
 * - No agregan código JavaScript extra en runtime.
 * - Evitan comportamientos inesperados.
 * - Son más claros al serializar/deserializar datos (ejemplo: enviar strings claros a una API o base de datos).
 * - Mejoran la interoperabilidad en proyectos frontend-backend.
 */

// Enum numérico (default; genera código JS y puede comportarse de forma confusa):
enum OrderStatus {
  Pending,    // 0  (OrderStatus.Pending === 0, OrderStatus[0] === "Pending")
  Paid,       // 1
  Shipped,    // 2
  Cancelled,  // 3
}

// Enum string (más legible en logs/Base de Datos, pero también genera código JS):
enum Role {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}

// ✨ Alternativa recomendada: objetos constantes + union types
const OrderStatusConst = {
  Pending: 'pending',
  Paid: 'paid',
  Shipped: 'shipped',
  Cancelled: 'cancelled',
} as const;

// Esto crea un tipo equivalente al enum pero sin runtime JS extra:
type OrderStatusType = typeof OrderStatusConst[keyof typeof OrderStatusConst];
// Equivalent a: 'pending' | 'paid' | 'shipped' | 'cancelled'

// Ahora puedes usar el tipo y el objeto para validar o asignar status:
function canCancel(status: OrderStatusType): boolean {
  return status === OrderStatusConst.Pending || status === OrderStatusConst.Paid;
}

// -- Exportaciones para pruebas y ejemplos
export { OrderStatus, Role, OrderStatusConst, canCancel };
export type { OrderStatusType };
