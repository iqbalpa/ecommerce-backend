import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Deleting UserProduct...");
	await prisma.userProduct.deleteMany();
	console.log("Deleting User...");
	await prisma.user.deleteMany();
	console.log("Deleting Admin...");
	await prisma.admin.deleteMany();
	console.log("Deleting Product...");
	await prisma.product.deleteMany();
	console.log("All records has been deleted");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
