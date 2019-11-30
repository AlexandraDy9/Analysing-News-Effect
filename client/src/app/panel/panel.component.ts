import { Component } from '@angular/core';
import { faCircle, faPlusSquare, faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  faChartBar = faChartBar;
  faCircle = faCircle;
  faPlusSquare = faPlusSquare;
  

  public companyes = [
    {
      name: 'Vodafone',
      symbol: 'VOD.L'
    },
    {
      name: 'Diageo',
      symbol: 'DGE.L'
    },
    {
      name: 'Bunzl',
      symbol: 'BNZL.L'
    },
    {
      name: 'Tesco',
      symbol: 'TSCO.L'
    },
    {
      name: 'Admiral',
      symbol: 'ADM.L'
    },
    {
      name: 'AstraZeneca',
      symbol: 'AZN.L'
    },
    {
      name: 'Aviva',
      symbol: 'AV.L'
    },
    {
      name: 'Unilever',
      symbol: 'ULVR.L'
    },
    {
      name: 'Hsbc',
      symbol: 'HSBA.L'
    },
    {
      name: 'Gsk',
      symbol: 'GSK.L'
    },
    {
      symbol: 'BP.L',
      name: 'BP'
    },
    {
      symbol: 'GSK.L',
      name: 'GlaxoSmithKline'
    },
    {
      symbol: 'BATS.L',
      name: 'British_American_Tobacco'
    },
    {
      symbol: 'RIO.L',
      name: 'Rio_Tinto'
    },
    {
      symbol: 'BHP.L',
      name: 'BHP'
    },
    {
      symbol: 'PRU.L',
      name: 'Prudential'
    },
    {
      symbol: 'CPG.L',
      name: 'Compass'
    },
    {
      symbol: 'GLEN.L',
      name: 'Glencore'
    },
    {
      symbol: 'NG.L',
      name: 'National_Grid'
    },
    {
      symbol: 'BARC.L',
      name: 'Barclays'
    },
    {
      symbol: 'EXPN.L',
      name: 'Experian'
    },
    {
      symbol: 'CRH.L',
      name: 'CRH'
    },
    {
      symbol: 'BA.L',
      name: 'BAE'
    },
    {
      symbol: 'SN.L',
      name: 'Smith_&_Nephew'
    },
    {
      symbol: 'ANTO.L',
      name: 'Antofagasta'
    },
    {
      symbol: 'AVV.L',
      name: 'Aveva'
    },
    {
      symbol: 'BKG.L',
      name: 'Berkeley'
    },
    {
      symbol: 'CCL.L',
      name: 'Carnival'
    },
    {
      symbol: 'CNA.L',
      name: 'Centrica'
    },
    {
      symbol: 'DCC.L',
      name: 'DCC'
    },
    {
      symbol: 'DGE.L',
      name: 'Diageo'
    },
    {
      symbol: 'EVR.L',
      name: 'Evraz'
    },
    {
      symbol: 'FLTR.L',
      name: 'Flutter'
    },
    {
      symbol: 'FERG.L',
      name: 'Ferguson'
    },
    {
      symbol: 'FRES.L',
      name: 'Fresnillo'
    },
    {
      symbol: 'GLEN.L',
      name: 'Glencore'
    },
    {
      symbol: 'HLMA.L',
      name: 'HALMA'
    },
    {
      symbol: 'HIK.L',
      name: 'HIKMA'
    },
    {
      symbol: 'HSX.L',
      name: 'HISCOX'
    },
    {
      symbol: 'ITV.L',
      name: 'ITV'
    },
    {
      symbol: 'JD.L',
      name: 'JD_SPORTS'
    },
    {
      symbol: 'LGEN.L',
      name: 'LEGAL&GEN'
    },
    {
      symbol: 'MNG.L',
      name: 'M&G_PLC'
    },
    {
      symbol: 'MGGT.L',
      name: 'Meggitt'
    },
    {
      symbol: 'MNDI.L',
      name: 'mondi'
    },
    {
      symbol: 'MRW.L',
      name: 'Morrison'
    },
    {
      symbol: 'NXT.L',
      name: 'NEXT'
    },
    {
      symbol: 'OCDO.L',
      name: 'ocado'
    },
    {
      symbol: 'PSON.L',
      name: 'pearson'
    },
    {
      symbol: 'PSN.L',
      name: 'Persimmon'
    },
    {
      symbol: 'PRU.L',
      name: 'Prudential'
    },
    {
      symbol: 'RDSA.L',
      name: 'RDS \'A\''
    },
    {
      symbol: 'RDSB.L',
      name: 'RDS \'B\''
    },
    {
      symbol: 'RMV.L',
      name: 'Rightmove'
    },
    {
      symbol: 'SBRY.L',
      name: 'SAINSBURY(J)'
    },
    {
      symbol: 'WPP.L',
      name: 'WPP'
    },
    {
      symbol: 'SDRC.L',
      name: 'SCHRODERS'
    },
    {
      symbol: 'SGRO.L',
      name: 'SEGRO'
    },
    {
      symbol: 'SN.L',
      name: 'SMITH&NEPHEW'
    },
    {
      symbol: 'SMDS.L',
      name: 'SMITH(DS)'
    },
    {
      symbol: 'SPX.L',
      name: 'SPIRAX-SARCO'
    },
    {
      symbol: 'SSE.L',
      name: 'SSE'
    },
    {
      symbol: 'WTB.L',
      name: 'WHITBREAD'
    }
  ];
}
