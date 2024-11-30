export interface CRUDController {
	create(data: any): any;
	retrieve(id: number | string): any;
	update(id: number | string, data: any): any;
	delete(id: number | string): any;
	retrieveAll(): any;
	deleteAll(): any;
}
