const SEGMENT = 4;
const ANGLE_GENE_LEN = 13;
const V_GENE_LEN = 6;
const X_GENE_LEN = 10;
const Y_GENE_LEN = 9;

function crossover(c1, c2){
    let res = new cromosome();
    let len = c1.gene.length;
    let seg_len = len / SEGMENT;

    for(let i = 0; i < SEGMENT; ++i){
        let start = i * seg_len;
        let end = (i + 1) * seg_len;

        if(i % 2 == 0){
            res.gene += c1.gene.slice(start, end);
        } else {
            res.gene += c2.gene.slice(start, end);
        }
    }

    return res;
}

class cromosome {
    constructor() {
        this.angle_gene = '0'.repeat(ANGLE_GENE_LEN);
        this.v_gene = '0'.repeat(V_GENE_LEN);
        this.x_gene = '0'.repeat(X_GENE_LEN);
        this.y_gene = '0'.repeat(Y_GENE_LEN);
        this.gene = '';
    }

    bitwise_or(g1, g2){
        let res = "";
        for(let i = 0; i < g1.length; ++i){
            res += ((g1[i] == '1' || g2[i] == '1')? '1': '0');
        }

        return res;
    }

    rand_gen_data(){
        let empty_angle_gene = '0'.repeat(ANGLE_GENE_LEN);
        let empty_v_gene = '0'.repeat(V_GENE_LEN);
        let empty_x_gene = '0'.repeat(X_GENE_LEN);
        let empty_y_gene = '0'.repeat(Y_GENE_LEN);

        let angle = Math.floor(rand(0, 2 * Math.PI) * 1000);
        let v = Math.floor(rand(0, 40));
        let x = Math.floor(rand(0, 700));
        let y = Math.floor(rand(0, 350));

        angle = angle.toString(2);
        v = v.toString(2).split('').reverse().join('');
        x = x.toString(2).split('').reverse().join('');
        y = y.toString(2).split('').reverse().join('');

        this.angle_gene = this.bitwise_or(empty_angle_gene, angle);
        this.v_gene = this.bitwise_or(empty_v_gene, v);
        this.x_gene = this.bitwise_or(empty_x_gene, x);
        this.y_gene = this.bitwise_or(empty_y_gene, y);

        this.gene = this.angle_gene + this.v_gene + this.x_gene + this.y_gene;
    }

    data(){
        return {
            angle: parseInt(this.angle_gene.split('').reverse().join(''), 2) / 1000,
            v: parseInt(this.v_gene.split('').reverse().join(''), 2),
            x: parseInt(this.x_gene.split('').reverse().join(''), 2),
            y: parseInt(this.y_gene.split('').reverse().join(''), 2)
        };
    }

}