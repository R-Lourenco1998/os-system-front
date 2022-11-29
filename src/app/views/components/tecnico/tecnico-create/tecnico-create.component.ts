import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Tecnico } from "src/app/models/Tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
    id: "",
    nome: "Ricardo",
    cpf: "073.870.284-60",
    telefone: "11 99999-9999",
  };

  constructor(private router: Router, private service: TecnicoService) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["tecnicos"]);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(["tecnicos"]);
      this.service.message("Técnico criado com sucesso!");
    });
  }
}
