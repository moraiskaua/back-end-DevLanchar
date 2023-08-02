import prismaClient from "../../prisma";

interface OrderRequest {
    name: string;
    table: number;
}

class CreateOrderService {
    async execute({ name, table }: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                name,
                table,
            }
        });

        return order;
    }
}

export { CreateOrderService };