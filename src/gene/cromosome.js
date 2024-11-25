const ANGLE_GENE_LEN = 10;
const V_GENE_LEN = 5;
const X_GENE_LEN = 10;
const Y_GENE_LEN = 9;
const GENE_LEN = ANGLE_GENE_LEN + V_GENE_LEN + X_GENE_LEN + Y_GENE_LEN

function crossover(c1, c2){
    let res = new cromosome();
    let n_gene = '';
    let len = c1.gene.length;
    let seg_len = len / CROSSOVER_SEGMENT;

    for(let i = 0; i < CROSSOVER_SEGMENT; ++i){
        let start = i * seg_len;
        let end = (i + 1) * seg_len;
        if(i % 2 == 0){
            n_gene += c1.gene.slice(start, end);
        } else {
            n_gene += c2.gene.slice(start, end);
        }
    }

    res.gene = n_gene;
    res.mutate();

    return res;
}

class cromosome {
    constructor() {
        this.fitness = 0;
        this.angle_gene = '0'.repeat(ANGLE_GENE_LEN);
        this.v_gene = '0'.repeat(V_GENE_LEN);
        this.x_gene = '0'.repeat(X_GENE_LEN);
        this.y_gene = '0'.repeat(Y_GENE_LEN);
        this.gene = '0'.repeat(GENE_LEN);
    }

    mutate(rate = MUTATION_RATE){
        let res = ''
        for(let i = 0; i < GENE_LEN; ++i){
            res += (Math.random() < rate? (this.gene[i] == '1'? '0': '1'): this.gene[i]);
        }

        this.gene = res;
        this.angle_gene = this.gene.slice(0, ANGLE_GENE_LEN);
        this.v_gene = this.gene.slice(ANGLE_GENE_LEN, ANGLE_GENE_LEN + V_GENE_LEN);
        this.x_gene = this.gene.slice(ANGLE_GENE_LEN + V_GENE_LEN, ANGLE_GENE_LEN + V_GENE_LEN + X_GENE_LEN);
        this.y_gene = this.gene.slice(ANGLE_GENE_LEN + V_GENE_LEN + X_GENE_LEN, GENE_LEN);
    
    }

    bitwise_or(g1, g2){
        let res = "";
        for(let i = 0; i < GENE_LEN; ++i){
            res += ((g1[i] == '1' || g2[i] == '1')? '1': '0');
        }

        return res;
    }

    rand_gen_data(){
        let empty_angle_gene = '0'.repeat(ANGLE_GENE_LEN);
        let empty_v_gene = '0'.repeat(V_GENE_LEN);
        let empty_x_gene = '0'.repeat(X_GENE_LEN);
        let empty_y_gene = '0'.repeat(Y_GENE_LEN);

        let angle = Math.floor(rand(0, 2 * Math.PI) * 100);
        let v = Math.floor(rand(0, 32));
        let x = Math.floor(rand(8, 692));
        let y = Math.floor(rand(8, 342));

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
            angle: parseInt(this.angle_gene.split('').reverse().join(''), 2) / 100,
            v: parseInt(this.v_gene.split('').reverse().join(''), 2),
            x: parseInt(this.x_gene.split('').reverse().join(''), 2),
            y: parseInt(this.y_gene.split('').reverse().join(''), 2)
        };
    }

}