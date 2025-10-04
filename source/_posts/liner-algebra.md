---
title: 线性代数及其应用
tags: 线性代数
sticky: 99
date: 2025-10-03 22:39:12
index_img: /img/index_img/liner_algebra.png
categories: 数学
---

# 笔记

本文是临近夏令营，简单地复习了一下线性代数方面相关的内容，果然重学了一遍才知道当初什么都没学懂！之后还会更新一些进阶的内容，希望我能记得起来。
<!-- more -->
## 线性代数及其应用

### 线性方程组

线性方程式形如$a_1x_1+a_2x_2+\cdots+a_nx_n=b$的式子，其中$a_i$为系数，$x_i$为未知数，$b$为常数。

一个线性方程组则为：

$$
\begin{cases}
a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n&=b_1\\
a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n&=b_2\\  
 \vdots \\
a_{m1}x_1+a_{m2}x_2+\cdots+a_{mn}x_n&=b_m
\end{cases}
$$

其中$m$为方程个数，$n$为未知数个数。

线性方程组的解只有三种情况：

- 无解
- 唯一解
- 无穷多解

注意到：**一个线性方程组是相容的，指的若它有一个解或者无穷多解；而一个方程组是不相容的，指的若它无解。**

### 矩阵乘法

线性方程组可以用矩阵形式表示：

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\  
 \vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\  
\vdots \\
x_n
\end{bmatrix}
=
\begin{bmatrix}
b_1 \\
b_2 \\  
 \vdots \\
b_m
\end{bmatrix}
$$

其中，这个线性方程组的增广矩阵形式为：

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_1\\
a_{21} & a_{22} & \cdots & a_{2n} & b_2\\  
 \vdots & \vdots & \ddots & \vdots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
\end{bmatrix}
$$

**矩阵的维数指的是矩阵的行数和列数。**

#### 求解线性方程组

基本方法：

- 初等行变换
  - （倍加变换）把某一行换成它本身与另一行的倍数的和。
  - （倍乘变换）把某一行乘以一个非零常数。
  - （对换变换）把某两行互换位置。

**如果两个矩阵是行等价的，那么其中某一个矩阵可以通过一系列初等行变换变换成另一个矩阵。**

**初等行变换是可逆的！**

    推论：若两个线性方程组的增广矩阵是行等价的，则它们的解集相同。
注意：
线性方程组的两个基本问题：**存在和唯一性**

    存在与唯一性定理：
        线性方程组相容的充要条件是增广矩阵的最右列不是主元列，就是说增广矩阵没有形如
                    [ 0 ...  0  b] b!= 0

    的行,若线性方程组相容它的解集有两种情况：
        (i)当没有自由变量时，有唯一解；
        (ii)当至少有一个自由变量时，有无穷多解。

#### 向量方程

仅含一列的矩阵称为列向量，仅含一行的矩阵称为行向量（简称向量）。

向量的加法：

$$
\begin{bmatrix}
a_1\\   
a_2\\  
 \vdots \\
a_n
\end{bmatrix}
+
\begin{bmatrix}
b_1\\   
b_2\\  
 \vdots \\
b_n
\end{bmatrix}
=
\begin{bmatrix}
a_1+b_1\\   
a_2+b_2\\  
 \vdots \\
a_n+b_n
\end{bmatrix}
$$

向量的数乘（标量乘法）：

$$
c\begin{bmatrix}
a_1\\   
a_2\\  
 \vdots \\
a_n
\end{bmatrix}
=
\begin{bmatrix}
ca_1\\   
ca_2\\  
 \vdots \\
ca_n
\end{bmatrix}
$$

向量的内积：

$$
\begin{bmatrix}
a_1\\   
a_2\\  
 \vdots \\
a_n
\end{bmatrix}
\cdot
\begin{bmatrix}
b_1\\   
b_2\\  
 \vdots \\
b_n
\end{bmatrix}
=
\sum_{i=1}^n a_ib_i
$$

##### 线性组合：

给定$R^n$中的向量 $\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}$，以及相应的系数 $c_1, c_2, \cdots, c_n$，则：

$$
\mathbf{y}=c_1\mathbf{v_1}+c_2\mathbf{v_2}+\cdots+c_n\mathbf{v_n}
$$

称为向量 $\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}$ 以系数 $c_1, c_2, \cdots, c_n$ 为权的的线性组合，其中 $\mathbf{y}$ 是 $R^n$ 中的一个向量。

##### 向量方程：

向量方程：

$$
\mathbf{a_1}x_1+\mathbf{a_2}x_2+\cdots+\mathbf{a_nx_n}=\mathbf{b}
$$

和增广矩阵

$$
\begin{bmatrix}
\mathbf{a_1} & \mathbf{a_2} & \cdots & \mathbf{a_n} & \mathbf{b}
\end{bmatrix}
$$

的线性方程组具有相同的解集，其中$\mathbf{b}$可以看作是$\mathbf{a_1}, \mathbf{a_2}, \cdots, \mathbf{a_n}$的线性组合，当且仅当线性方程组有解。

给定$R^n$中的向量 $\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}$，则$\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}$的所有线性组合构成了$R^n$中的一个向量空间，记作$\mathcal{V}$，也可表示为$Span\{\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}\}$。
即形如：

$$
\mathbf{a_1}c_1+\mathbf{a_2}c_2+\cdots+\mathbf{a_nc_n}
$$

的向量的集合，其中$c_1, c_2, \cdots, c_n$为标量。

#### 线性方程Ax=b

若$\mathbf{A}$是m行n列的矩阵，它的各列为$\mathbf{a_1}, \mathbf{a_2}, \cdots, \mathbf{a_n}$，$\mathbf{x}$是$R^n$中的列向量，则$\mathbf{A}$与$\mathbf{x}$的乘积就是$\mathbf{A}$的各列以$\mathbf{x}$中对应元素为权的线性组合。

$$
\mathbf{A}\mathbf{x}=
\begin{bmatrix}
\mathbf{a}_1 & \mathbf{a}_2 & \cdots & \mathbf{a}_n
\end{bmatrix}
\begin{bmatrix}
x_1\\
x_2\\
\vdots \\
x_n
\end{bmatrix}
=
\begin{bmatrix}
\mathbf{a}_1 x_1+\mathbf{a}_2 x_2+\cdots+\mathbf{a}_n x_n
\end{bmatrix}
$$

注意：**当且仅当 $\mathbf{Ax}$ 中$\mathbf{A}$的列数等于$\mathbf{x}$的维数时，才有定义**

    方程Ax=b有解当且仅当b是A的各列行向量的线性组合。
性质：
若$\mathbf{A}$是m行n列的矩阵，$\mathbf{u}$和$\mathbf{v}$是$R^n$中的向量，$c$是标量，则：

- $\mathbf{A}(\mathbf{u}+\mathbf{v})=\mathbf{A}\mathbf{u}+\mathbf{A}\mathbf{v}$
- $\mathbf{A}(c\mathbf{u})=c\mathbf{A}\mathbf{u}$

#### 齐次线性方程组

齐次线性方程组：

线性方程组称为齐次的，当前仅当它可以写为：$\mathbf{A}\mathbf{x}=\mathbf{0}$的形式，其中$\mathbf{A}$是m行n列的矩阵，$\mathbf{x}$是$R^n$中的列向量，$\mathbf{0}$是$R^m$中的零向量。这样的方程组至少有一个解，即$\mathbf{x}=\mathbf{0}$。**更重要的是我们需要知道它是否有非平凡解**

    齐次线性方程组有非平凡解当且仅当方程至少含有一个自由变量。

##### 参数表示的非齐次线性方程组的解

设方程$\mathbf{Ax}=\mathbf{b}$对某个$\mathbf{b}$是相容的，$\mathbf{p}$是一个特解，则$\mathbf{Ax}=\mathbf{b}$的解集可以表示为：
$\mathbf{w}=\mathbf{p}+\mathbf{v_h}$，其中$\mathbf{v_h}$是齐次方程$\mathbf{Ax}=\mathbf{0}$的任意一个解。

说明若$\mathbf{Ax}=\mathbf{b}$有解，则解集可由$\mathbf{Ax}=\mathbf{0}$的解平移向量$\mathbf{p}$得到。

### 线性无关

$R^n$中一组向量$\{\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}\}$线性无关，若向量方程

$$
x_1\mathbf{v_1}+x_2\mathbf{v_2}+\cdots+x_n\mathbf{v_n}=\mathbf{0}
$$

仅有平凡解。若为线性相关的，则存在不全为0的权$\{c_1, c_2, \cdots, c_n\}$使得

$$
c_1\mathbf{v_1}+c_2\mathbf{v_2}+\cdots+c_n\mathbf{v_n}=\mathbf{0}
$$

#### 线性相关的特征

两个或更多向量的集合$S=\{\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_n}\}$线性相关，当且仅当$S$中至少有一个向量是其他向量的线性组合，事实上，若S线性相关，且$\mathbf{v_1}\neq\mathbf{0}$，则某个$\mathbf{v_j}(j>1)$是它前面几个向量$\{\mathbf{v_1}, \mathbf{v_2}, \cdots, \mathbf{v_{j-1}}\}$的线性组合。

    定理：若一个向量组的向量个数超过每个向量元素的个数，则该向量组线性相关。

    定理：若向量组S里包含零向量，则S线性相关。

### 线性变换

变换$\mathbf{T}$是线性的，若：

- 对$\mathbf{T}$的定义域中的一切$\mathbf{u}$和$\mathbf{v}$，都有$\mathbf{T}(\mathbf{u}+\mathbf{v})=\mathbf{T}(\mathbf{u})+\mathbf{T}(\mathbf{v})$
- 对一切的标量$c$和向量$\mathbf{u}$，都有$\mathbf{T}(c\mathbf{u})=c\mathbf{T}(\mathbf{u})$

#### 线性变换的矩阵

设$\mathbf{T}$是$R^n$到$R^m$的线性变换，$\mathbf{T}$的矩阵形式为$\mathbf{A}$，则：

$$
\mathbf{T}(\mathbf{x})=\mathbf{Ax}
$$

对一切$R^n$中的向量$\mathbf{x}$，都有$\mathbf{T}(\mathbf{x})$是$R^m$中的向量。事实上，$\mathbf{A}$是$m\times n$矩阵，它的第$i$行是$\mathbf{T}(\mathbf{e}_i)$，其中$\mathbf{e}_i$是单位矩阵$\mathbf{I}_n$中的第$i$列。
即：

$$
\mathbf{A} = \left[ \mathbf{T}(\mathbf{e}_1), \mathbf{T}(\mathbf{e}_2), \ldots, \ \mathbf{T}(\mathbf{e}_n) \right]
$$

### 矩阵代数

设$A$和$B$为$m\times n$矩阵，则有如下的结果：

1、$(A^T)^T=A$，即$A^T$的转置等于$A$
2、$(AB)^T=B^TA^T$，即$AB$的转置等于$B^TA^T$
3、$(A+B)^T=A^T+B^T$，即$(A+B)$的转置等于$A^T+B^T$

#### 可逆矩阵

设$A$为$m\times n$矩阵，如果存在非零元素的$n\times n$矩阵$B$，使得$AB=BA=I_n$，则称$A$为可逆矩阵。不可逆矩阵也称为奇异矩阵。

对于二阶矩阵$\begin{bmatrix}a & b\\c & d \end{bmatrix}$的逆矩阵，有：

$$
A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}
d & -b\\
-c & a 
\end{bmatrix}
$$

其中，若$ad-bc\neq 0$，则$A$为可逆矩阵；若$ad-bc=0$，则$A$为奇异矩阵。

如果一个维度为$n\times n$的矩阵$A$可逆，则对$R^n$中任一向量$\mathbf{b}$，方程$A\mathbf{x}=\mathbf{b}$的解$\mathbf{x}$也可唯一确定,解为：

$$
\mathbf{x}=\begin{bmatrix}
A^{-1}
\end{bmatrix}\mathbf{b}
$$

##### 可逆矩阵定理：

1、对于任意数$r$,有$(rA)^T=rA^T$
2、$(A^T)^{-1}=(A^{-1})^T$
3、$(AB)^{-1}=B^{-1}A^{-1}$，即$(AB)^{-1}$等于$B^{-1}A^{-1}$。

#### 初等变换与矩阵求逆

初等变换是指将单位矩阵进行一次初等行变换。行变换是可逆的，因此得到的初等矩阵也是可逆的，并且有初等矩阵$E$的逆是一个同类型的初等矩阵，它将矩阵$E$变换到单位阵。

    定理：nxn的矩阵A可逆，当且仅当A行等价于单位阵I，此时，把A变为单位阵的一系列初等行变换同时把单位阵I变为矩阵A的逆矩阵。

##### 求逆矩阵的算法

将矩阵$A$和单位阵$I$排在一起写为增广矩阵的形式$\begin{bmatrix}A & I \end{bmatrix}$,对增广矩阵进行行变换时，$A$与$I$同时进行同一变换，那么如果有一系列的初等行变换将$A$变换到单位阵，那么$I$将变换得到矩阵$A^{-1}$,否则$A$没有逆矩阵。

注意：更有实际意义的一个观点是，将增广矩阵$\begin{bmatrix}A & I \end{bmatrix}$变换为$\begin{bmatrix}I & A^{-1} \end{bmatrix}$实际上是在解n个方程组：

$$
A\mathbf{x}=e_1,A\mathbf{x}=e_2,...,A\mathbf{x}=e_n
$$

其中$e_i$是$n$维单位向量。
**实际应用中并不需要求解所有方程组，只需要求解需要的$A\mathbf{x}=e_i$的解即可。**

#### 矩阵的因式分解

##### LU分解

设矩阵$A$为$m\times n$矩阵，$A=LU$，其中$L$为$m\times m$单位下三角矩阵，$U$为$m\times n$为与$A$等价的阶梯型矩阵。LU分解是用来求解线性方程组的一种方法。当矩阵$A=LU$时，方程组$Ax=b$可写为$L(Ux)=L(y)$，即转换为求解两个方程组：

$$
Ly=b
$$

$$
Ux=y
$$

这两个方程都很容易求解，因为它们都是三角矩阵。

LU分解的步骤：
设$A$可以仅用行倍加变换化简为阶梯型矩阵$U$。即存在一系列单位下三角初等矩阵$E_1,E_2,...,E_p$，使得$E_p \cdots E_1 A=U$。于是，$A=(E_p \cdots E_1)^{-1}U=LU$.
其中$L=(E_p \cdots E_1)^{-1}$

**有意思的是，我们需要注意到，将A转换成U的一系列行变换，同时也将L转换成I。这是因为，$E_p \cdots E_1 A=U$，因此，$E_p \cdots E_1 L = I$。那么显然，因为$U$的下三角部分均为$0$,$I$的下三角部分也均为$0$,因此$L$的下三角部分其实为A的下三角部分除以其对应主元列元素的结果。**

#### 子空间

定义：$R^n$中的子空间是指,$R^n$中的集合$H$，满足：

1. $H$中任意两个向量$\mathbf{x},\mathbf{y}\in H$，$\mathbf{x}+\mathbf{y}\in H$
2. $\mathbf{x}\in H$，$\lambda\mathbf{x}\in H$ ($\lambda \in R$)
3. 零向量$\mathbf{0}\in H$

子空间的性质：
1.矩阵$A$的列空间$Col(A)$是指$A$的列向量各线性组合构成的集合。且是矩阵$A$的主元列向量构成的集合。
2.矩阵$A$的零空间$Nul(A)$是指$A$的零空间，即$A\mathbf{x}=0$的解$\mathbf{x}$构成的集合。且是矩阵$A$的自由变量构成的集合。

##### 子空间的基

设$H$为$R^n$中的子空间，$H$的基是指$H$中向量的集合$B$，使得$H=Span\{ \mathbf{b}_1,\mathbf{b}_2,\cdots,\mathbf{b}_k \}$，其中$\mathbf{b}_1,\mathbf{b}_2,\cdots,\mathbf{b}_k$是$H$中的线性无关向量。

#### 维数与秩

##### 坐标系

假设$B=\{\mathbf{b}_1,\mathbf{b}_2,\cdots,\mathbf{b}_k\}$是$H$的一个基，对$\mathbf{H}$中的每一个向量$\mathbf{x}$，可以用基$B$中的向量$\{\mathbf{b}_1,\mathbf{b}_2,\cdots,\mathbf{b}_k\}$的坐标表示：

$$
\mathbf{x}=\sum_{i=1}^k \alpha_i\mathbf{b}_i
$$

其中$\alpha_1,\alpha_2,\cdots,\alpha_k$是$\mathbf{x}$在基$B$中的坐标。

##### 维数

非零子空间$H$的维数是指，用$dim(H)$表示,是指$H$中任意一个基的向量的个数。

##### 秩

矩阵$A$的秩，记作$rank(A)$，是指$A$列空间的维数。

如果一矩阵$A$有n列，则$n = rank(A) + dim(Nul(A))$。

秩与可逆矩阵定理：
如果一个矩阵$A$可逆，则有：

1. $rank(A)=n$
2. $A$的列向量构成一个$R^n$的基.
3. $Col(A)=R^n$
4. $Nul(A)=\{0\}$
5. $dim(Col(A))=n$
6. $dim(Nul(A))=0$

### 行列式

定义：当$n\ge 2$时，$n\times n$矩阵$A$的行列式$det(A)$是形如$+-a_{1j}detA_{1j}$的n个项的和，其中加减号在交替出现，其中元素$a_{1j}$是$A$的第1行第j列元素。

$$
detA = a_{11}detA_{11} - a_{12}detA_{12} + a_{13}detA_{13} - \cdots + (-1)^{n+1}a_{1n}detA_{1n}\\
= \sum_{j=1}^n (-1)^{j+1}a_{1j}detA_{1j}
$$

余因子展开式：$A$的$(i,j)$余因子$C_{ij}$由下式给出：

$$
C_{ij} = (-1)^{i+j}detA_{ij}
$$

于是有，

$$
detA = \sum_{j=1}^n a_{1j}C_{1j}
$$

#### 行列式的性质

行变换定理：若A是n阶方阵，

1. 若A的第i行与第j行交换，则detA的符号改变；
2. 若A的某一行的倍数加到另一行得到矩阵B，则$detA = detB$。
3. 若A的某行乘以倍数k得到矩阵B，则$detB = k\cdot detA$。

定理：若A 为三角阵，则detA等于A的主对角线上元素的乘积。

**计算行列式可以将其化为三角矩阵来进行求解。**

转置：
方阵A的转置的行列式等于A的行列式。即$det(A^T) = detA$。

乘法：
若方阵A与B均为$n \times n$矩阵，则$detAB = detA\cdot detB$。

#### 克拉默法则

定义对任意$n\times n$矩阵$A$和$R^n$中的向量$\mathbf{b}$，$A_i(\mathbf{b})$*表示A中第i列由向量$\mathbf{b}$替换得到的矩阵。

$$
A_i(\mathbf{b}) = [\mathbf{a_1} \cdots \mathbf{b} \cdots \mathbf{a_n}]
$$

克拉默法则：
设$A$是一个可逆的$n \times n$矩阵，$\mathbf{b}$是一个$n$维向量，方程$A\mathbf{x}=\mathbf{b}$的唯一解$\mathbf{x}$存在，可由下式给出：

$$
x_i = \frac{detA_i(\mathbf{b})}{detA},i=1,2,\cdots,n
$$

逆矩阵公式：

$$
A^{-1} = \frac{1}{detA}\begin{bmatrix}
C_{11} & C_{21} & \cdots & C_{n1}\\
C_{12} & C_{22} & \cdots & C_{n2}\\
\vdots & \vdots & \ddots & \vdots\\
C_{1n} & C_{2n} & \cdots & C_{nn}
\end{bmatrix}
$$

其中$C_{ij}$是$A$的$(i,j)$余因子，所构成的矩阵称为伴随矩阵，记作$adjA$。

### 向量空间与子空间

向量空间的定义：
一个向量空间是由一些被称为向量的对象构成的非空集合$\mathbf{V}$,以及两个运算：

1. 加法：$\mathbf{v},\mathbf{w}\in\mathbf{V}$，$\mathbf{v}+\mathbf{w}\in \mathbf{V}$
2. 标量乘法：$\alpha \in R,\mathbf{v}\in\mathbf{V}$，$\alpha\mathbf{v}\in\mathbf{V}$并且有以下公理：
3. $\mathbf{u}+\mathbf{v}=\mathbf{v}+\mathbf{u}$
4. $(\mathbf{u}+\mathbf{v})+\mathbf{w}=\mathbf{u}+(\mathbf{v}+\mathbf{w})$
5. $\mathbf{V}$中存在一个零向量$\mathbf{0}$，使得$\forall\mathbf{v}\in\mathbf{V},\mathbf{v}+\mathbf{0}=\mathbf{v}$。
6. 对每一个$\mathbf{v}\in\mathbf{V}$，存在一个负向量$\mathbf{-v}$，使得$\mathbf{v}+\mathbf{-v}=\mathbf{0}$。
7. $c(\mathbf{v}+\mathbf{w})=c\mathbf{v}+c\mathbf{w}$
8. $(a+b)\mathbf{v}=a\mathbf{v}+b\mathbf{ v}$
9. $c(d\mathbf{v})=(cd)\mathbf{v}$
10. $1\mathbf{v}=\mathbf{v}$

#### 子空间

定义：设$\mathbf{V}$是一个向量空间，$\mathbf{H}\subset\mathbf{V}$，如果$\mathbf{H}$是一个子空间如果满足以下三个性质：
a. $\mathbf{H}$中存在一个零向量$\mathbf{0}$
b. $\mathbf{H}$对向量加法封闭，即$\forall\mathbf{v}\in\mathbf{H},\forall\mathbf{w}\in\mathbf{H},\mathbf{v}+\mathbf{w}\in\mathbf{H}$
c. $\mathbf{H}$对标量乘法封闭，即$\forall\alpha\in R,\forall\mathbf{v}\in\mathbf{H},\alpha\mathbf{v}\in\mathbf{H}$

**定理**：若$v_1,v_2,\cdots,v_n$是$\mathbf{V}$中的向量，则$Span\{v_1,v_2,\cdots,v_n\}$是$\mathbf{V}$的一个子空间。

#### 矩阵的零空间

定义：设$A$是一个$m\times n$矩阵，$\mathbf{v}\in R^n$，则$A\mathbf{v}=0$的解集称为矩阵$A$的零空间。表示为：

$$
Nul(A) = \{ \mathbf{v}\in R^n : A\mathbf{v}=0 \}
$$

**定理**：$A$是一个$m\times n$矩阵，则$Nul(A)$是$R^n$的一个子空间。等价地说，m个方程，n个未知数的齐次线性方程组$Ax=0$的解集是$R^n$的一个子空间。

#### 列空间

定义：设$A$是一个$m\times n$矩阵，则$A$的列的所有线性组合组成的集合是$A$的列空间，记作$Col(A)=Span\{ \mathbf{a}_1,\mathbf{a}_2,\cdots,\mathbf{a}_n\}$。

**定理**：$A$是一个$m\times n$矩阵，则$Col(A)$是$R^m$的一个子空间。
注意到，$Col(A)$可以写为

$$
Col(A) = \{\mathbf{b}:\mathbf{b}=A\mathbf{x},\mathbf{x}\in R^n\},\mathbf{x}为某向量。
$$

#### 线性变换的核与值域

定义：设$T:V\to W$是一个线性变换，它将$\mathbf{V}$中的每个向量$\mathbf{v}$映射到$\mathbf{W}$中的一个向量唯一向量$\mathbf{w} = T(v)$,并且满足：

1. $T(\mathbf{u}+\mathbf{v})=T(\mathbf{u})+T(\mathbf{v})$
2. $T(\alpha\mathbf{v})=\alpha T(\mathbf{v})$, 对所有$\alpha\in R$和$\forall\mathbf{v}\in\mathbf{V}$均成立。

**线性变换T的核(kernel)**：
设$T:V\to W$是一个线性变换，则线性变换T的核是$\mathbf{V}$中所有满足$T(\mathbf{v})=\mathbf{0}$的向量的集合。记作$ker(T)$。T的值域是$\mathbf{W}$中所有具有形式$T(v)(\forall v\in V)$的向量的集合。

如果一个线性变换T是由一个矩阵变换得到的，即$T(x)=Ax$，则T的值域与核恰好是A的列空间核与零空间。

#### 基

定义：设$\mathbf{V}$是一个向量空间，令$\mathbf{H}$是向量空间$\mathbf{V}$的一个子空间，$\mathbf{V}$中向量的指标集$\mathbf{B}=\{\mathbf{b}_1,\mathbf{b}_2,\cdots,\mathbf{b}_m\}$称为$\mathbf{H}$的一个基，如果有：

1. $\mathbf{B}$是一个线性无关集。
2. 由$\mathbf{B}$生成的子空间与$\mathbf{H}$相同。

**定理**：矩阵A的主元列构成了A的列空间的基。

**生成集定理：** 令$S=\{v_1,v_2,\cdots,v_n\}$是$\mathbf{V}$中的向量集，且有$H=Span\{v_1,v_2,\cdots,v_n\}$
a. 若$S$中的某一个向量$\mathbf{v_k}$，是S其余向量的线性组合，则S去掉$\mathbf{v_k}$后形成的集合仍然能够生成$\mathbf{H}$。
b. 若$H\neq \{\mathbf{0}\}$,则S的某一子集是H的一个基。

##### 坐标系

对于向量空间$V$中的一组基$B=\{b_1,b_2,\cdots,b_n\}$，则对$V$中的每个向量$x$，可以用基$B$中的元素表示为：

$$
\mathbf{x} = \sum_{i=1}^n a_i\mathbf{b_i}
$$

于是，定义$\mathbf{x}$相对于基$B$的坐标是使得$\mathbf{x}=\sum_{i=1}^n a_i\mathbf{b_i}$的权$a_1,a_2,\cdots,a_n$。记作

$$
[\mathbf{x}]_B = \begin{bmatrix}
  a_1\\
  a_2\\
  \vdots\\
  a_n
\end{bmatrix}
$$

令

$$
P_B = [\mathbf{b_1},\mathbf{b_2},\cdots,\mathbf{b_n}]
$$

则$\mathbf{x}=a_1\mathbf{b_1}+a_2\mathbf{b_2}+\cdots+a_n\mathbf{b_n}$等价于$\mathbf{x}=P_B[\mathbf{x}]_B$.称$P_B$为从$B$到$R^n$的**坐标变换矩阵**。

#### 向量空间的维数

若向量空间$\mathbf{V}$中存在一组基$\{\mathbf{b}_1,\mathbf{b}_2,\cdots,\mathbf{b}_n\}$，则$\mathbf{V}$中任意包含多于n个向量的集合一定线性相关。

**定理**：若向量空间$\mathbf{V}$是由一个有限集生成的，则称$\mathbf{V}$为有限维的，其维数写为$dim(\mathbf{V})$。是指$\mathbf{V}$的基中含有向量的个数。零向量空间 $\{\mathbf{0}\}$ 的维数定义为0。反之，如果$\mathbf{V}$不是由一有限集生成，那么其称为无穷维的。

**定理**：令$\mathbf{H}$为$\mathbf{V}$的一个子空间，则$\mathbf{H}$中任意一个线性无关集均可以扩充为$\mathbf{H}$的一个基，$\mathbf{H}$也是有限维的，且有：

$$
dim(\mathbf{H}) \leq dim(\mathbf{V})
$$

    NulA的维数是方程Ax=0中自由变量的个数，ColA的维数是A中主元列的个数。

#### 秩

**定理**：若两个矩阵$A$和$B$行等价，则它们的行空间相同。若B为阶梯型矩阵，则B的非零行构成A的行空间的一个基的同时也构成了B的行空间的一个基。

**A的秩即为A的列空间的维数。**

**秩定理**：设$A$为$m\times n$矩阵，A的行空间与列空间的维数相等，这个维数称为A的秩，还等于A的主元位置的个数且满足：

$$
rank(A) + dim(NulA) = n
$$

**秩与可逆矩阵定理**：设$A$为$n\times n$矩阵，如果A是可逆矩阵,则有：

1. A的列构成$R^n$的一个基。
2. $ColA=R^n$
3. $dimColA=n$
4. $rank(A)=n$
5. $NulA=\{\mathbf{0}\}$
6. $dim(NulA)=0$

注意到：A的行空间是$A^T$的列空间，又A可逆当且仅当$A^T$可逆。，所以对上述一系列判读可逆矩阵同样适用于$A^T$。

#### 基变换

设$B=\{\mathbf{b_1},\mathbf{b_2},\cdots,\mathbf{b_n}\}$与$C=\{\mathbf{c_1},\mathbf{c_2},\cdots,\mathbf{c_n}\}$是向量空间$\mathbf{V}$的两个基，则存在一个$n \times n$矩阵$P$，使得：

$$
[\mathbf{x}]_C = P[\mathbf{x}]_B
$$

且，$P$的列是基$B$中向量的$C-坐标向量$，即：

$$
P = \begin{bmatrix}
[\mathbf{b_1}]_C,
[\mathbf{b_2}]_C,
\cdots
[\mathbf{b_n}]_C
\end{bmatrix}
$$

若$B=\{\mathbf{b_1},\mathbf{b_2},\cdots,\mathbf{b_n}\}$，$E$是$R^n$的标准基$\{\mathbf{e}_1,\mathbf{e}_2,\cdots,\mathbf{e}_n\}$，则$[\mathbf{b_1}]_E=\mathbf{b_1}$,$B$中的其他向量也类似，引入坐标变换矩阵$P_{E\leftarrow B}$,则其与$P_B$等价。

#### 马尔科夫链的矩阵形式

定义：
**概率向量**：一个具有非负分量，且各分量的数值相加等于1的向量称为概率向量。
**概率矩阵**：随机矩阵是指各列向量都是概率向量的矩阵。
**马尔科夫链**：一个马尔科夫链是一个概率向量序列$\mathbf{x_1},\mathbf{x_2},\cdots,\mathbf{x_n}$和一个随机转移矩阵$P$，满足：

$$
\mathbf{x_i} = P\mathbf{x_{i-1}},i=2,3,\cdots,n0
$$

$\mathbf{x_k}$中的数值分别列出来一个系统在n各可能状态下的概率，或者实验结果是n个可能概率之一的概率。因此，$\mathbf{x_k}$通常被称为状态向量。

**稳态向量**：若P是一个随机矩阵，则相对于P的稳态向量是一个满足:

$$
P\mathbf{q}=\mathbf{q}
$$

的概率向量$\mathbf{q}$。每一个随机矩阵都有一个稳态向量。

**定理**：若P是一个$n\times n$正规的随机矩阵，则P具有唯一的稳态向量$\mathbf{q}$.进一步的，如果$\mathbf{x_0}$是**任一个**起始状态，且有$\mathbf{x_{k+1}}=P\mathbf{x_k},k=0,1,\cdots$,则当$k\rightarrow\infty$时，马尔科夫链$\{\mathbf{x_k}\}$收敛到稳态向量$\mathbf{q}$.

### 特征值与特征向量

定义：$\mathbf{A}$为$n \times n$矩阵，$\mathbf{x}$为非零向量，若存在数$\lambda$使得$\mathbf{Ax}=\lambda \mathbf{x}$成立，则称$\lambda$为$\mathbf{A}$的特征值，$\mathbf{x}$称为对应于$\lambda$的特征向量。

**定理**：三角矩阵的主对角线元素是特征值。

注意：$\lambda$是$A$的特征值当且仅当

$$
(A-\lambda I)\mathbf{x}=\mathbf{0}
$$

**定理**：$\lambda_1,\cdots,\lambda_r$是$n \times n$矩阵A相异的特征值，$\mathbf{v}_1,\cdots,\mathbf{v}_r$是与$\lambda_1,\cdots,\lambda_r$对应的特征向量,那么向量集合$\{\mathbf{v}_1,\cdots,\mathbf{v}_r\}$线性无关。

#### 特征方程

求解特征方程是指，找出所有的$\lambda$，使得$\mathbf{A}\mathbf{x}=\lambda\mathbf{x}$成立。等价于要求出所有的$\lambda$,使得矩阵$\mathbf{A}-\lambda I$为不可逆矩阵。

行列式与特征方程：设A为$n\times n$矩阵，则$\mathbf{A}$是可逆的当且仅当
1.0不是A的特征值。
2.A的行列式不为0。

#### 行列式的性质

设A和B为$n\times n$矩阵，则：
a. A可逆的充分必要条件是A的行列式不为0。
b. $det(AB)=det(A)det(B)$
c. $detA^T=detA$
d.若$A$是三角矩阵，那么$detA$是$A$的主对角线元素的乘积。
e.对$A$作行替换不改变院行列式的值，做一次行交换使其行列式值的符号改变一次。数乘一行后，行列式的值等于用此数乘原来的行列式。

**定理**：数$\lambda$是$n \times n$矩阵A的特征值的充分必要条件是$\lambda$是特征方程$det(A-\lambda I)=0$的根。

#### 相似性

设A和B为$n\times n$矩阵，如果存在可逆矩阵P，使得$P^{-1}AP=B$，或者等价地$A=PBP^{-1}$，则称A相似于B。记$Q=P^{-1}$，则有$Q^{-1}BQ=A$,即B也相似于A。把A变为$P^{-1}AP$的变换称为相似变换。

**定理**：如果$n\times n$矩阵A与B是相似的，那么它们有相同的特征多项式，从而有相同的特征值。

#### 对角化

如果$n\times n$矩阵A相似于对角矩阵，即存在可逆矩阵P和对角矩阵D，有$A=P^{-1}DP$，则称A为可对角化矩阵。

**定理**：如果$n\times n$矩阵A可对角化可对角化的充分必要条件是$\mathbf{A}$有n个线性无关的特征向量。事实上，$A=P^{-1}DP$,D为对角矩阵的充分必要条件是P的列向量是A的n个线性无关的特征向量。此时，D中对角线上的元素分别是A的对应于P中特征向量的特征值。

注意到，A可对角化也就是说有足够的特征向量形成$R^n$的一个基，我们称这组基为特征向量基。

**定理**：有n个相异特征值的$n\times n$矩阵可对角化。（是充分的，但不是充要的）

#### 微分方程中的应用

(待续)

### 正交性和最小二乘法

向量的长度：向量 $\mathbf{v}$的长度（范数）是非负数$||\mathbf{v}||$，定义为：

$$
||\mathbf{v}||=\sqrt{\mathbf{v} \cdot \mathbf{v}}=\sqrt{\sum_{i=1}^n v_i^2} 且 ||\mathbf{v}||^2 = \mathbf{v} \cdot \mathbf{v}
$$

对于任意数$c \in \mathbb{R}$，有：

$$
c||\mathbf{v}||= \left |c \right|  \left \Vert \mathbf{v} \right \Vert
$$

长度为1的向量称为单位向量，如果把一个非零向量除以自身长度，即乘以$1/||\mathbf{v}||$，那么得到的向量就是单位向量，这称为向量$\mathbf{v}$的单位化。

$\mathbb{R}^n$空间中的向量$\mathbf{v}$和$\mathbf{w}$的距离，记作$dist(\mathbf{v},\mathbf{w})$，定义为：

$$
dist(\mathbf{v},\mathbf{w})=\left \Vert \mathbf{v}-\mathbf{w} \right \Vert = \sqrt{(\mathbf{v}-\mathbf{w}) \cdot (\mathbf{v}-\mathbf{w})}
$$

#### 正交向量

如果向量$\mathbf{v} \cdot \mathbf{w}=0$，则称$\mathbf{v}$和$\mathbf{w}$是相互正交的，记作$\mathbf{v} \perp \mathbf{w}$。

**毕达哥斯拉定理**：两个向量$\mathbf{v}$和$\mathbf{w}$相互正交的充要条件是${\left \Vert \mathbf{v}+\mathbf{w} \right \Vert}^2=\left \Vert \mathbf{v} \right \Vert^2+\left \Vert \mathbf{w} \right \Vert^2$。

#### 正交补

如果向量$\mathbf{z}$与$\mathbb{R}^n$的子空间$\mathbf{W}$中的任意向量都正交，则称$\mathbf{z}正交于\mathbf{W}$。那么与子空间$\mathbf{W}$正交的向量$\mathbf{z}$的集合称为$\mathbf{W}$的正交补，记作$\mathbf{W}^{\perp}$。

**定理1**：

1. 向量$\mathbf{x}$属于$\mathbf{W}^{\perp}$的充分必要条件是向量$\mathbf{x}$与生成空间$\mathbf{W}$中任一向量$\mathbf{w}$都不正交。
2. $\mathbf{W}^{\perp}$是$\mathbb{R}^n$的一个子空间。

**定理2**：假设矩阵$\mathbf{A}$是$m\times n$的矩阵，那么$\mathbf{A}$的行向量空间的正交补空间是$\mathbf{A}$的零空间，且$\mathbf{A}$的列向量空间的正交补是$\mathbf{A}^{\intercal}$的零空间:

$$
(Row A)^{\perp}= Nul(A) \quad  且\quad(Col A)^{\perp}= Nul(A^T)
$$

#### 正交集

$\mathbb{R}^n$中的向量集合$\{\mathbf{v}_1,\mathbf{v}_2,\cdots,\mathbf{v}_k\}$称为正交向量集，如果集合中任意两个不同的向量都正交，即当$i \neq j$时,有$\mathbf{v}_i \perp \mathbf{v}_j$。

**定理3**：如果$S=\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_k\}$是$\mathbb{R}^n$中的非零向量构成的正交向量集，那么$S$是线性无关集，因此构成所生成子空间$\mathbf{S}$的一组基。

**定理4**：假设$\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_p\}$是$\mathbb{R}$中子空间$\mathbb{W}$的正交基，则对$\mathbb{W}$中的每个向量$\mathbf{y}$，线性组合$\mathbf{y}=c_1\mathbf{u}_1+c_2\mathbf{u}_2+\cdots+c_p\mathbf{u}_p$的系数$c_1,c_2,\cdots,c_p$中的权值可以由$c_j=\frac{\mathbf{y} \cdot \mathbf{u}_j}{\mathbf{u}_j \cdot \mathbf{u}_j} \quad (j=1,2,\cdots,p)$给出。

#### 正交投影

考虑$\mathbb{R}^n$中的一个向量$\mathbf{y}$分解为两个向量之和的问题，一个向量是$\mathbf{u}$的数量乘积，另一个向量与$\mathbf{u}$垂直，其中向量$\mathbf{u}$是给定的。写为：

$$
\mathbf{y}= \mathbf{\hat{y}}+\mathbf{z}
$$

其中，$\mathbf{\hat{y}}=\alpha \mathbf{u} \quad \alpha是个数$，$\mathbf{z}$是一个垂直于$\mathbf{u}$的向量。

可以求得，
$\alpha = \frac{\mathbf{y} \cdot \mathbf{u}}{\mathbf{u} \cdot \mathbf{u}}$
$\mathbf{\hat{y}}=\frac{\mathbf{y}\cdot\mathbf{u}}{\mathbf{u} \cdot \mathbf{u}} \cdot \mathbf{u}$。
称向量$\mathbf{\hat{y}}$是$\mathbf{y}$在$\mathbf{u}$上的正交投影，而向量$\mathbf{z}$是$\mathbf{y}$垂直$\mathbf{u}$的分量。

例子：对于向量空间$\mathbf{W}=\mathbb{R}^2=Span\{\mathbf{u}_1,\mathbf{u}_2\}$，$\mathbf{u}_1,\mathbf{u}_2$相互正交，那么对于任意$\mathbb{R}^2$中的向量$\mathbf{y}$，都有：

$$
\mathbf{y}=\frac{\mathbf{y}\cdot\mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1} \cdot \mathbf{u}_1+\frac{\mathbf{y}\cdot\mathbf{u}_2}{\mathbf{u}_2 \cdot \mathbf{u}_2} \cdot \mathbf{u}_2
$$

#### 单位正交集

集合$\{\mathbf{u}_1,\cdots,\mathbf{u}_n\}$是一个单位正交集，如果它们是由单位向量构成的正交集。如果$\mathbf{W}$是一个由单位正交集组成的子空间，那么$\{\mathbf{u}_1,\cdots,\mathbf{u}_n\}$是$\mathbf{W}$的**单位正交基**，因为这类集合自然线性无关。

**定理5**：一个$m \times n$矩阵$\mathbf{U}$具有单位正交列向量的充分必要条件是$\mathbf{U}^{\intercal}\mathbf{U}=\mathbf{I}$。

**定理6**：假设$\mathbf{U}$是一个具有单位正交列向量的$m \times n$矩阵，且$\mathbf{x}$和$\mathbf{y}$是$\mathbb{R}^n$中的向量，那么：
a. $\left \Vert U\mathbf{x} \right \Vert=\left \Vert \mathbf{x} \right \Vert$
b. $(\left \Vert U\mathbf{x} \right \Vert)(\left \Vert U\mathbf{y} \right \Vert)= \mathbf{x} \cdot \mathbf{y}$
c. $(\left \Vert U\mathbf{x} \right \Vert)(\left \Vert U\mathbf{y} \right \Vert)=0$的充要条件是$\mathbf{x} \perp \mathbf{y}$。
这些性质表明：**线性映射$\mathbf{x}\mapsto U\mathbf{x}$保持长度和正交性**。

定理5和定理6表明一个 **正交矩阵** 就是一个可逆的方阵$U$,且满足：$U^T=U^{-1}$。这样的矩阵具有单位正交列，且任何具有单位正交列的方阵是正交矩阵。

#### 正交分解

**正交分解定理**：若$W$是$\mathbb{R}^n$的子空间，那么$\mathbb{R}^n$中的每一个向量$\mathbf{y}$都可以唯一表示为：

$$
\mathbf{y}=\mathbf{\hat{y}}+\mathbf{z}
$$

其中$\mathbf{\hat{y}}$属于$\mathbf{W}$，$\mathbf{z}$属于$\mathbf{W}^{\perp}$。如果$\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_p\}$是$\mathbf{W}$的正交基，那么$\mathbf{y}$可以唯一表示为：

$$
\mathbf{y}=\sum_{i=1}^p \frac{\mathbf{y}\cdot\mathbf{u}_i}{\mathbf{u}_i \cdot \mathbf{u}_i} \mathbf{u}_i
$$

且$\mathbf{z}=\mathbf{y}-\mathbf{\hat{y}}$。式中，$\mathbf{\hat{y}}$称为 **$\mathbf{y}$在$W$上的正交投影**，记作$proj_w(\mathbf{y})$。

**正交投影的性质**：如果$\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_p\}$是$\mathbf{W}$的正交基，且如果$\mathbf{y}$属于$\mathbf{W}$，那么$proj_w(\mathbf{y})=\mathbf{y}$。

**最佳逼近定理**：假设$W$是一个$\mathbb{R}^n$的子空间，$\mathbf{y}$是$\mathbb{R}^n$中的任意向量，$\mathbf{\hat{y}}$是$\mathbf{y}$在$W$上的正交投影，那么$\mathbf{\hat{y}}$是$W$上最接近$\mathbf{y}$的点，也就是

$$
\left \Vert \mathbf{y}-\mathbf{\hat{y}} \right \Vert \leq \left \Vert \mathbf{y}-\mathbf{v} \right \Vert
$$

对于所有属于$W$又异于$\mathbf{\hat{y}}$的向量$\mathbf{v}$成立。

**定理7**：如果$\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_p\}$是$\mathbb{R}^n$中子空间$\mathbf{W}$的单位正交基，那么：

$$
proj_w(\mathbf{y})=(\mathbf{y}\cdot\mathbf{u}_1)\mathbf{u}_1+\cdots+(\mathbf{y}\cdot\mathbf{u}_p)\mathbf{u}_p
$$

如果$U=[\mathbf{u}_1\ \cdots\ \mathbf{u}_p]$,则：

$$
proj_w(\mathbf{y})=UU^T\mathbf{y},对所有\mathbf{y}\in\mathbb{R}^n成立
$$

#### 格拉姆-施密特方法

格拉姆-施密特方法是对$\mathbb{R}^n$中任何非零子空间构造正交集或标准正交集的简单算法。

**步骤**：
对$\mathbb{R}^n$中的子空间的一个基$\{\mathbf{x}_1,\mathbf{x}_2,\cdots,\mathbf{x}_p\}$，定义：

$$
\mathbf{v}_1=\mathbf{x}_1\\
\mathbf{v}_2=\mathbf{x}_2-\frac{\mathbf{x}_2 \cdot \mathbf{v}_1}{\mathbf{v}_1\cdot\mathbf{v}_1}\mathbf{v}_1\\
\cdots\\
\mathbf{v}_p=\mathbf{x}_p-\frac{\mathbf{x}_p \cdot \mathbf{v}_1}{\mathbf{v}_1\cdot\mathbf{v}_1}\mathbf{v}_1-\frac{\mathbf{x}_p \cdot \mathbf{v}_2}{\mathbf{v}_2\cdot\mathbf{v}_2}\mathbf{v}_2+\cdots-\frac{\mathbf{x}_p \cdot \mathbf{v}_{p-1}}{\mathbf{v}_{p-1}\cdot\mathbf{v}_{p-1}}\mathbf{v}_{p-1}
$$

那么$\{\mathbf{v}_1,\mathbf{v}_2,\cdots,\mathbf{v}_p\}$就是$\mathbf{W}$的一个正交基，此外

$$
Span\{\mathbf{v}_1,\mathbf{v}_2,\cdots,\mathbf{v}_p\}=Span\{\mathbf{x}_1,\mathbf{x}_2,\cdots,\mathbf{x}_k\},其中1\leq k\leq p
$$

注意到，如果需要得到一个标准正交基，只需要单位化所有的向量$\mathbf{v}_k$即可。

**QR分解**：如果$m \times n$矩阵$\mathbf{A}$的列线性无关，$\mathbf{A}$可以分解为$A=QR$，其中$Q$是一个$m \times n$的矩阵，其列形成了$ColA$的一个标准正交基，$R$是一个$n \times n$的上三角矩阵可逆矩阵且在对角线上的元素为正数。

应用：$A$的列向量构成$ColA$的一个基$\{\mathbf{x}_1,\mathbf{x}_2,\cdots,\mathbf{x}_n\}$,构造$W=ColA$的一个标准正交基$\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_n\}$，这个基可以由格拉姆-施密特方法构造。
取

$$
Q= [\mathbf{u}_1\ \cdots\ \mathbf{u}_n]
$$

对$k=1,2,\cdots,n$，$\mathbf{x_k}$属于$Span\{\mathbf{x}_1,\mathbf{x}_2,\cdots,\mathbf{x}_{k}\}=Span\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_{k}\}$，所以存在常数$r_{1k},r_{2k},\cdots,r_{kk}$使得：

$$
\mathbf{x}_k=r_{1k}\mathbf{u}_1+\cdots+r_{kk}\mathbf{u}_k+0\cdot \mathbf{u}_{k+1}+\cdots+0\cdot \mathbf{u}_n
$$

可以假设$r_{kk}\geq 0$(否则，则对$r_{kk}$和$\mathbf{u}_k$都乘以-1)，那这表明$\mathbf{x_k}$是$Q$的列的线性组合，且其权为

$$
\begin{bmatrix}
    r_{1k}\\
    \vdots\\
    r_{kk}\\
    0\\
    \vdots\\
    0
\end{bmatrix}
$$

即$\mathbf{x}_k=Q\mathbf{r}_k$，其中$k=1,2,\cdots,n$。取$R=[\mathbf{r}_1\ \cdots\ \mathbf{r}_n]$,那么

$$
A=[\mathbf{x}_1\ \cdots\ \mathbf{x}_n]=[Q\mathbf{r}_1\ \cdots\ Q\mathbf{r}_n]=QR
$$

注意到，如果Q的列是单位正交向量，则有$Q^TA=Q^T(QR)=IR=R$

#### 最小二乘法

考虑$A\mathbf{x}$作为$\mathbf{b}$的一个近似，$\mathbf{b}$和$A\mathbf{x}$之间的距离越小，$\left \Vert \mathbf{b}-A\mathbf{x} \right \Vert$近似程度越好。一般的**最小二乘问题**就是找出使得$\left \Vert \mathbf{b}-A\mathbf{x} \right \Vert$尽量小的$\mathbf{x}$。

定义：如果$m \times n$矩阵$A$和向量$\mathbf{b}$属于$\mathbb{R}^m$,则$A\mathbf{x}=\mathbf{b}$的最小二乘解是$\mathbb{R}$中的向量$\mathbf{\hat{x}}$，使得：

$$
\left \Vert \mathbf{b}-A\mathbf{\hat{x}} \right \Vert \leq \left \Vert \mathbf{b}-A\mathbf{x} \right \Vert
$$

对于所有$\mathbf{x}\in \mathbb{R}^n$成立。

对于上述问题的$A$和$\mathbf{b}$，应用最佳逼近定理与子空间$ColA$
取

$$
\mathbf{\hat{b}}=proj_{ColA}(\mathbf{b})
$$

由于$\mathbf{\hat{b}}$属于$A$的列空间，故方程$A\mathbf{x}=\mathbf{\hat{b}}$是相容的且存在一个属于$\mathbb{R}^n$的$\mathbf{\hat{x}}$使得

$$
\begin{equation}
A\mathbf{\hat{x}}=\mathbf{\hat{b}}
\end{equation}
$$

由于$\mathbf{\hat{b}}$是$ColA$中最接近$\mathbf{b}$的点，因此一个向量$\mathbf{\hat{x}}$是$A\mathbf{x}=\mathbf{b}$的一个最小二乘解的充分必要条件$\mathbf{\hat{x}}$满足(1)式。这个属于$\mathbb{R}^n$的$\mathbf{\hat{x}}$是由一系列由A的列构造的$\mathbf{\hat{b}}$的权。

若$\mathbf{\hat{x}}$满足$A\mathbf{\hat{x}}=\mathbf{\hat{b}}$,则由正交分解定理，投影$\mathbf{\hat{b}}$具有性质$\mathbf{b}-\mathbf{\hat{b}}$与$ColA$正交，即$\mathbf{b}-A\mathbf{\hat{x}}$正交于$A$的每一列。如果$\mathbf{a}_j$是$A$的某一列，那么$\mathbf{a}_j \cdot (\mathbf{b}-A\mathbf{\hat{x}})=0$且$\mathbf{a}_j^T\cdot (\mathbf{b}-A\mathbf{\hat{x}})=0$.由于每一个$\mathbf{a}_j^T$是$A^T$的行，于是

$$
A^T(\mathbf{b}-A\mathbf{\hat{x}})=\mathbf{0}
$$

于是

$$
\begin{equation}
A^T\mathbf{b}=A^T A\mathbf{\hat{x}}
\end{equation}
$$

于是方程(2)表示的线性方程组称为$A\mathbf{x}=\mathbf{b}$的法方程，其解用$\mathbf{\hat{x}}$表示。

**定理8**：方程$A\mathbf{x}=\mathbf{b}$的最小二乘解集和法方程$A^T\mathbf{b}=A^T A\mathbf{\hat{x}}$的非空解集一致。

**定理9**：设$A$是$m \times n$矩阵，则下面的条件是逻辑等价的

1. 对于$\mathbb{R}^n$中的每个$\mathbf{b}$，方程$A\mathbf{x}=\mathbf{b}$有唯一最小二乘解
2. $A$的列是线性无关的
3. 矩阵$A^T A$是可逆的
   当上述条件成立时，唯一的最小二乘解$\mathbf{\hat{x}}$可以表示为：

$$
\mathbf{\hat{x}}=(A^T A)^{-1}A^T\mathbf{b}
$$

**定理10**：给定一个$m \times n$矩阵$A$，它具有线性无关的列，取$A=QR$是$A$的QR分解，那么对于每一个属于$\mathbb{R}^n$的向量$\mathbf{b}$，方程$A\mathbf{x}=\mathbf{b}$的有唯一的最小二乘解为：

$$
\mathbf{\hat{x}}=R^{-1}Q^T\mathbf{b}
$$

#### 应用

(待续)

#### 内积空间

定义：向量空间$V$上的内积是一个函数，对每一对属于$V$的向量$\mathbf{u}$和$\mathbf{v}$，存在一个实数$<\mathbf{u},\mathbf{v}>$满足下述公理，其中$\mathbf{u},\mathbf{v}和\mathbf{w}$都是$V$中的向量,$c$是所有数：

1. $<\mathbf{u},\mathbf{v}>=<\mathbf{v},\mathbf{u}>$
2. $<\mathbf{u}+\mathbf{v},\mathbf{w}>=<\mathbf{u},\mathbf{w}>+<\mathbf{v},\mathbf{w}>$
3. $<c\mathbf{u},\mathbf{v}>=c<\mathbf{u},\mathbf{v}>$
4. $<\mathbf{u},\mathbf{u}>\geq 0$且$<\mathbf{u},\mathbf{u}>=0$当且仅当$\mathbf{u}=0$

一个赋予上述内积的向量空间称为内积空间。

##### 长度、距离和正交性

设$V$是一个内积空间，其内积记作$<\mathbf{u},\mathbf{v}>$.像$\mathbb{R}^n$一样，我们定义一个向量$\mathbf{v}$的长度或范数为：

$$
\left \Vert \mathbf{v} \right \Vert=\sqrt{<\mathbf{v},\mathbf{v}>}
$$

一个 **单位向量**是长度为1的向量，**向量$\mathbf{u}$和$\mathbf{v}$的距离是$\left \Vert \mathbf{u}-\mathbf{v} \right \Vert$**。向量$\mathbf{u}$和向量$\mathbf{v}$**正交**，如果$<\mathbf{u},\mathbf{v}>=0$。

给定内积空间$V$中的向量$\mathbf{v}$和有限维子空间$W$，我们可以得到：

$$
\left \Vert \mathbf{v} \right \Vert^2=\left \Vert proj_W(\mathbf{v}) \right \Vert^2+\left \Vert \mathbf{v}-proj_W(\mathbf{v}) \right \Vert^2
$$

**柯西-施瓦茨不等式**：对于$V$中的任意向量$\mathbf{v}$和$\mathbf{u}$，有：

$$
\left \Vert <\mathbf{v},\mathbf{u}> \right \Vert\leq \left \Vert \mathbf{v} \right \Vert\left \Vert \mathbf{u} \right \Vert
$$

**定理11**：对属于$V$的任意向量$\mathbf{v}$和$\mathbf{u}$，有：

$$
\left \Vert \mathbf{u}+\mathbf{v} \right \Vert\leq \left \Vert \mathbf{u} \right \Vert+\left \Vert \mathbf{v} \right \Vert
$$

### 对称矩阵与二次型

**对称矩阵**是一个$n\times n$方阵，满足$A_T=A$。

**定理1**：如果$A$是对称矩阵，那么不同特征空间的任意两个特征向量是正交的。

一个矩阵$A$称为可**正交对角化**，如果存在一个正交矩阵$P$(满足$P^{-1}=P^T$)和一个对角矩阵$D$，使得

$$
A=PDP^T=PDP^{-1}
$$

**定理2**：一个$n\times n$矩阵$A$可正交对角化当且仅当$A$是对称矩阵。

**谱定理**：矩阵$A$的特征值的集合称为$A$的谱。一个对称的$n\times n$矩阵$A$有如下性质：

1. $A$有n个实特征值，包含重复的特征值。
2. 对每一个特征值$\lambda$，对应的特征空间的维数等于$\lambda$作为特征方程的根的重数。
3. 特征空间相互正交，这种正交性是在特征向量对应于不同特征值的意义下成立的。
4. $A$可正交对角化

#### 谱分解

假设$A=PDP^{-1}$，其中$P$的列是$A$的单位正交特征向量$\{\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_n\}$,且对应的特征值为$\{\lambda_1,\lambda_2,\cdots,\lambda_n\}$,属于对角矩阵$D$。由于$P^T=P^{-1}$，所以:

$$
A = \lambda_1 \mathbf{u}_1^T \mathbf{u}_1 + \lambda_2 \mathbf{u}_2^T \mathbf{u}_2 + \cdots + \lambda_n \mathbf{u}_n^T \mathbf{u}_n
$$

将$A$分解为由$A$的谱确定的小块，这个$A$的表示就称为**A的谱分解**。

#### 二次型

$\mathbb{R}^n$上的一个二次型是一个定义在$\mathbb{R}^n$上的函数，它在向量$\mathbf{x}$处的值为可由表达式$\mathbb{Q}(\mathbf{x})=\mathbf{x}^TAx$给出。$A$是一个$n\times n$对称矩阵，称为**关于二次型的矩阵**。

**二次型的变量代换**：如果$\mathbf{x}$表示$\mathbb{R}^n$中的一个向量，那么**变量代换**是如下的形式：

$$
\mathbf{x}=P\mathbf{y} \quad or \quad \mathbf{x}=P^{-1}\mathbf{y}
$$

其中$P$是一个$n\times n$的可逆矩阵。
于是对于二次型$\mathbf{x}^TA\mathbf{x}$，有：

$$
\mathbf{x}^TA\mathbf{x}=(P\mathbf{y})^T A (P\mathbf{y}) = \mathbf{y}^T A P^T P \mathbf{y} = \mathbf{y}^T (P^T A P) \mathbf{y}
$$

新的二次型矩阵变为$P^T A P$。因为$A$是对称矩阵，于是存在正交矩阵$P$使得$P^T A P$是角矩阵$D$,于是新的二次型变为$\mathbf{y}^T D \mathbf{y}$。

**主轴定理**：设$A$是一个$n\times n$对称矩阵，那么存在一个正交变量代换$\mathbf{x}=P\mathbf{y}$，它将二次型$\mathbf{x}^TA\mathbf{x}$变为不含交叉乘积项的二次型$\mathbf{y}^T D \mathbf{y}$。
定理中的矩阵$P$的列称为二次型$\mathbf{x}^TA\mathbf{x}$的**主轴**，向量$\mathbf{y}$是向量$\mathbf{x}$的在这些主轴构造的$\mathbb{R}^n$中的单位正交基下的坐标向量。

**二次型的分类**：
一个二次型$Q$是：

1. **正定的**,如果对所有$\mathbf{x}\neq\mathbf{0}$，有$Q(\mathbf{x})>0$。
2. **负定的**,如果对所有$\mathbf{x}\neq\mathbf{0}$，有$Q(\mathbf{x})<0$。
3. **不定的**，如果$Q(\mathbf{x})$既有正值也有负值。
   此外，$Q$被称为**半正定的**，如果对所有$\mathbf{x}$，有$Q(\mathbf{x})\geq 0$；被称为**半负定的**，如果对所有$\mathbf{x}$，有$Q(\mathbf{x})\leq 0$。

**定理3**：设$A$是一个$n\times n$对称矩阵，那么一个二次型$\mathbf{x}^TA\mathbf{x}$是:

1. **正定的**,当且仅当$A$的所有特征值都是正的。
2. **负定的**,当且仅当$A$的所有特征值都是负的。
3. **不定的**,当且仅当$A$有正的和负的特征值。

对任何对称矩阵$A$,在$\Vert\mathbf{x}\Vert =1$的条件下，$\mathbf{x}^TA\mathbf{x}$所有可能值的集合是实轴上的闭区间。分别用$m$和$M$表示区间的左端点和右端点，即：

$$
m=min\{\mathbf{x}^TA\mathbf{x}:\Vert\mathbf{x}\Vert=1\} \quad and \quad M=max\{\mathbf{x}^TA\mathbf{x}: \Vert\mathbf{x}\Vert=1\}
$$

**定理4**：设$A$是一个$n\times n$对称矩阵，那么有$M$是$A$的最大特征值$\lambda_1$，$m$是$A$的最小特征值。如果$\mathbf{x}$是对应于$M$的单位特征向量$\mathbf{u}_1$，那么$\mathbf{x}^TA\mathbf{x}$的值等于$M$。如果$\mathbf{x}$是对应于$m$的单位特征向量，那么$\mathbf{x}^TA\mathbf{x}$的值等于$m$。

**定理5**：设$A$是一个$n\times n$对称矩阵，在条件：

$$
\mathbf{x}^T\mathbf{x}=1 \quad \mathbf{x}^T \mathbf{u}_1=0
$$

$\mathbf{x}^TA\mathbf{x}$的最大值是**第二大**特征值$\lambda_2$，这个最大值可以在$\mathbf{x}$对应于$\lambda_2$的特征向量$\mathbf{u}_2$的条件下得到。

**定理6**：设$A$是一个$n\times n$对称矩阵，其可正交对角化为$PDP^{-1}$，,将对角矩阵$D$的对角元素重新排列，使得$\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$，那么$P$的列是其对应的单位特征向量${\mathbf{u}_1,\mathbf{u}_2,\cdots,\mathbf{u}_n}$。那么对$k=2,3,\cdots,n$，在以下条件的的限制下：

$$
\mathbf{x}^T\mathbf{x}=1,\quad \mathbf{x}^T\mathbf{u}_1=0,\quad\cdots \quad \mathbf{x}^T\mathbf{u}_k=0
$$

$\mathbf{x}^TA\mathbf{x}$的最大值是$\lambda_k$，这个最大值可以在$\mathbf{x}$等于$\lambda_k$的特征向量$\mathbf{u}_k$的条件下得到。

#### 奇异值分解

并非所有的矩阵都能分解为$A=PDP^{-1}$,且$D$是对角的，但分解$A=QDP^{-1}$对于任意$m\times n$的矩阵$A$都是可能的，此类分解称为**奇异值分解**。

令$A$为$m\times n$矩阵，那么$A^TA$是对称矩阵且可以正交对角化。令$\{\mathbf{v}_1,\mathbf{v}_2,\cdots,\mathbf{v}_n\}$是$\mathbb{R}^n$中的单位正交基且构成$A^TA$的特征向量，$\lambda_1 ,\lambda_2,\cdots,\lambda_n$是$A^TA$的特征值。那么对于$1\leq i\leq n$，有：

$$
\Vert A\mathbf{v}_i \Vert^2=(A\mathbf{v}_i)^T A\mathbf{v}_i=\mathbf{v}_i^T A^TA\mathbf{v}_i\\
=\mathbf{v}_i^T (\lambda_i \mathbf{v}_i)\\
=\lambda_i
$$

所以$A^TA$的特征值都非负，假设所有的特征值重新排列为满足：

$$
\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n
$$

则$A$的奇异值就是$A^TA$的特征值的平方根，记作$\sigma_1,\sigma_2,\cdots,\sigma_n$递减排列。**$A$的奇异值就是向量$A\mathbf{v}_1,\mathbf{v}_2,\cdots,\mathbf{v}_n$的长度**。

**定理7**：假若$\{\mathbf{v}_1,\mathbf{v}_2,\cdots,\mathbf{v}_n\}$是包含$A^TA$的特征向量的$\mathbb{R}^n$中的单位正交基，重新整理使得对应的特征值满足$\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$.假若$A$有r个非零奇异值，那么$\{A\mathbf{v}_1,A\mathbf{v}_2,\cdots,A\mathbf{v}_n\}$是$ColA$的一个正交基，且$rank A = r$.

矩阵$A$的分解涉及到一个$m\times n$的“对角”矩阵$\Sigma$,其形式为：

$$
\Sigma = \begin{bmatrix}
D & 0 \\
0 & 0
\end{bmatrix}
$$

其中$D$是一个$r\times r$的对角矩阵，且r不超过m和n中的较小值。（如果r=m或r=n或都相等，则$M$中不会出现零矩阵。）

**定理8**：设$A$是一个秩为r的$m\times n$矩阵，那么存在一个$m\times r$矩阵$\Sigma$其中$D$的对角元素是$A$的前r个奇异值,$\sigma_1\geq \sigma_2\geq \cdots \geq \sigma_r > 0$,并且存在一个$m\times m$的正交矩阵$U$和一个$n\times n$的正交矩阵$V$，满足：

$$
A = U\Sigma V^T
$$

这样一个分解中的$U$的列称为$A$的**左奇异向量**，而$V$的列称为$A$的**右奇异向量**。

**可逆矩阵定理**：
设$A$是一个$n\times n$矩阵，那么下述命题中每一个都与$A$是可逆矩阵等价：

1. $(Col A)^\perp = \{\mathbf{0}\}$
2. $(Nul A)^\perp = \mathbb{R}^n$
3. $Row A = \mathbb{R}^n$
4. $A$有n个非零的奇异值

##### 伪逆

取$r=rank A$,那么将$U$和$V$矩阵分块为第一块包含r列的子矩阵，于是有。

$$
A=[U_r \quad U_{m-r}]
\begin{bmatrix}
D & 0 \\
0 & 0
\end{bmatrix}\begin{bmatrix}
V_r^T \\
V_{n-r}^T
\end{bmatrix}=U_rD V_r^T
$$

称为$A$的**简化奇异值分解**，由于$D$的对角线元素非零，因此$D$是可逆矩阵。
矩阵$A$的伪逆为：

$$
A^+ = V_rD^{-1}U_r^T
$$
