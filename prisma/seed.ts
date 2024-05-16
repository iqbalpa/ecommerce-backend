import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

const data: { label: string; path: string }[] = [
	{ label: "Admin", path: "./prisma/seeding/Admin.json" },
	{ label: "User", path: "./prisma/seeding/User.json" },
	{ label: "Product", path: "./prisma/seeding/Product.json" },
];

const seedDatabase = async () => {
	for (const { label, path } of data) {
		try {
			try {
				const rawData = await fs.readFile(path, "utf8"); // Read file as string
				const items = JSON.parse(rawData);
				console.log(`Reading data from ${path}`);

				for (const item of items) {
					// Iterate over the items
					if (label === "Admin") {
						await prisma.admin.create({ data: item }); // Use the data property
					} else if (label === "User") {
						await prisma.user.create({ data: item });
					} else {
						await prisma.product.create({ data: item });
					}
				}
			} catch (e) {
				console.error(`Error seeding database from ${path}:`, e); // Log the error itself
			}
		} catch (e) {
			console.log(`error seeding database from ${path}\n`);
		}
	}
};

seedDatabase()
	.then(() => console.log("seeding data finished."))
	.catch((e) => console.log(e))
	.finally(() => prisma.$disconnect());
